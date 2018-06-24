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

interface Prediction{
  nextRank:Rank,
  nextPercent: number;
}

const MAX_POSSIBLE_RATING= 59999;

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
  
  faction=0;

  prediction :Prediction|null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      rank: [null,Validators.required],
      percent: [null, Validators.required],
      points: [null, Validators.required]
    });

    this.decay = DecayEstimates.values.map(e =>{
      const rank:Rank = ranks.find(r=> r.Rank == e.rank);
      return {
        rank:e.rank,
        value:e.value,
        ImperialTitle: rank.ImperialTitle,
        RebelTitle: rank.RebelTitle
      }
    });


  }
  setFaction(faction){
    this.faction = faction;
  }

  getRankName(rank){
    return this.faction===0?rank.ImperialTitle:rank.RebelTitle;
  }

  onSubmit(form: FormGroup) {
    if(form.valid){
    this.prediction = this.predict(form.value.rank, parseInt(form.value.percent), parseInt(form.value.points));
    }else{
      console.log("form is not valid");
    }
  }

  predict(rank: Rank, rank_percent: number, gcw_points: number): Prediction {

    const rating = rank.MinRating + (rank_percent / 100) * (rank.MaxRating - rank.MinRating);
    let rating_delta = Math.ceil(((rank.RatingEarningCap * gcw_points) / (rank.RatingEarningCap + gcw_points) )) - rank.MaxRatingDecay;
    //Clamp delta to earing cap
    if(rating_delta > rank.RatingEarningCap){
      rating_delta = rank.RatingEarningCap;
    }
    //Get new Rating. Clamp value to decay floor or max possible rating.
    const nextRating = Math.min(Math.max( rating + rating_delta , rank.RatingDecayFloor), MAX_POSSIBLE_RATING);


    const nextRank = ranks.filter(r=>r.MinRating<=nextRating && r.MaxRating >= nextRating)[0];

    const nextPercent = Math.round( ( (nextRating-nextRank.MinRating) / (nextRank.MaxRating-nextRank.MinRating) * 100));
      
    return {
      nextRank: nextRank,
      nextPercent: nextPercent,
    }

  }
}
