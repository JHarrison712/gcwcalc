import { Component, OnInit } from "@angular/core";
import { ranks, Rank, DecayEstimates } from "./ranks";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { PercentPipe } from "@angular/common";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

interface Prediction {
  nextRank: Rank,
  nextPercent: number;
}

const MAX_POSSIBLE_RATING = 59999;

@Component({
  selector: "app-panel",
  templateUrl: "./panel.component.html",
  styleUrls: ["./panel.component.css"]
})
export class PanelComponent implements OnInit {
  public ranks = ranks;

  public decayCols = DecayEstimates.displayOrder
  public decay;

  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  faction = 0;

  prediction: Prediction | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      rank: [null, Validators.required],
      percent: [null, [Validators.required, Validators.min(0), Validators.max(99.99)]],
      points: [null, [Validators.required, , Validators.min(0), Validators.max(10000000)]]
    });

    this.decay = DecayEstimates.values.map(e => {
      const rank: Rank = ranks.find(r => r.Rank == e.rank);
      return {
        rank: e.rank,
        value: e.value,
        ImperialTitle: rank.ImperialTitle,
        RebelTitle: rank.RebelTitle
      }
    });


  }
  setFaction(faction) {
    this.faction = faction;
  }

  getRankName(rank) {
    return this.faction === 0 ? rank.ImperialTitle : rank.RebelTitle;
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.prediction = this.predict(form.value.rank, parseInt(form.value.percent), parseInt(form.value.points));
    } else {
      console.log("form is not valid");
    }
  }

  predict(rank: Rank, rank_percent: number, gcw_points: number): Prediction {

    //Point to offset decay
    //iter->second->pointToOffsetDecay =
    //  static_cast<int>(
    //    (
    //        static_cast<int64>(iter->second->ratingEarningCap)
    //        *
    //        static_cast<int64>(iter->second->ratingDecayBalance - 1)
    //    )
    //    /
    //    static_cast<int64>(
    //      iter->second->ratingEarningCap
    //      -
    //      iter->second->ratingDecayBalance + 1
    //    )
    //  )
    //  + 1;

    //Server Already knows current Rating. Get good-faith estimate based on rank progress %
    const rating = Math.floor(rank.MinRating + (rank_percent / 100) * (rank.MaxRating - rank.MinRating));
    console.log("rating"+rating);
    //Start SOE Calc
    const pointsToOffsetdecay = Math.floor((
      (rank.RatingEarningCap * rank.RatingDecayBalance - 1)
      /
      (rank.RatingEarningCap - rank.RatingDecayBalance + 1)
    ) + 1);
    console.log(`Decay Points ${pointsToOffsetdecay}`);

    let totalEarnedRating = 0, totalEarnedRatingAfterDecay = 0, cappedRatingAdjustment = 0;

    // convert points to rating
    if (gcw_points > 0) {
      const numerator = gcw_points * rank.RatingEarningCap;
      const denominator = gcw_points + rank.RatingEarningCap;
      // round any fractional rating up so that no hard earned GCW points are "lost"
      totalEarnedRating = Math.ceil(numerator / denominator);

      // if the rank is a decayable rank, and the GCW points is more than
      // what is required to offset rank decay, use a different formula
      // to calculate the additional rank progress
      if (rank.RatingDecayBalance > 0 && totalEarnedRating >= rank.RatingDecayBalance && pointsToOffsetdecay > 0 && gcw_points > pointsToOffsetdecay){
        const numerator = (gcw_points - pointsToOffsetdecay) * (rank.RatingEarningCap - rank.RatingDecayBalance + 1000);
        const denominator = (gcw_points - pointsToOffsetdecay) + (rank.RatingEarningCap - rank.RatingDecayBalance + 1000);
        totalEarnedRating = Math.ceil(numerator / denominator);
        totalEarnedRating += rank.RatingDecayBalance;
      }

    } else {
      totalEarnedRating = 0;
    }
    console.log(`totalEarnedRating ${totalEarnedRating}`);

    //apply rating decay if any
    totalEarnedRatingAfterDecay = totalEarnedRating - rank.RatingDecayBalance;

    console.log(`totalEarnedRatingAfterDecay ${totalEarnedRatingAfterDecay}`);
    //if rating loss from, cap loss
    cappedRatingAdjustment = Math.max(-rank.MaxRatingDecay, totalEarnedRatingAfterDecay);
    console.log(`cappedRatingAdjustment ${cappedRatingAdjustment}`);

    // if there's a decay floor, make sure the rating decay doesn't cause the rating to fall below the floor
    let finalRatingAdjustment = cappedRatingAdjustment;
    if(rank.RatingDecayFloor > 0 && finalRatingAdjustment < 0 && (rating+finalRatingAdjustment) < rank.RatingDecayFloor ){
      finalRatingAdjustment = rank.RatingDecayFloor - rating;
    }
    finalRatingAdjustment = Math.floor(finalRatingAdjustment);
    console.log(`finalRatingAdjustment ${finalRatingAdjustment}`);
    //End SOE Calc

    // //This was my reverse engineer guess at the equations
    // let rating_delta = Math.ceil(((rank.RatingEarningCap * gcw_points) / (rank.RatingEarningCap + gcw_points))) - rank.MaxRatingDecay;
    // //Clamp delta to earing cap
    // if (rating_delta > rank.RatingEarningCap) {
    //   rating_delta = rank.RatingEarningCap;
    // }


    // //Get new Rating. Clamp value to decay floor or max possible rating.
    const nextRating = Math.floor(Math.min(rating + finalRatingAdjustment, MAX_POSSIBLE_RATING));
    console.log(`nextRating ${nextRating}`);

    const nextRank = ranks.filter(r => r.MinRating <= nextRating && r.MaxRating >= nextRating)[0];

    const nextPercent = Math.round(((nextRating - nextRank.MinRating) / (nextRank.MaxRating - nextRank.MinRating+1) * 100)*100)/100;
    console.log(`nextPercent ${nextPercent}`);
    return {
      nextRank: nextRank,
      nextPercent: nextPercent,
    }

  }
}
