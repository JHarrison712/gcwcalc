export interface Rank {
  Rank: number,
  MinRating: number,
  MaxRating: number,
  ImperialTitle: string,
  RebelTitle: string,
  RatingEarningCap: number,
  RatingDecayBalance: number,
  MaxRatingDecay: number,
  RatingDecayFloor: number
}

export const DecayEstimates = {
  displayOrder:['title','value'],
  values:[
    {rank:7, value:6000},
    {rank:8, value:6500},
    {rank:9, value:7200},
    {rank:10, value:8150},
    {rank:11, value:9600},
    {rank:12, value:12000},
  ]
}
export const RankDisplay=['rank','imperialTitle', 'minRating','maxRating','ratingEarningCap','maxRatingDecay']

export const ranks: Rank[] = [
  {
    "Rank": 1,
    "MinRating": 0,
    "MaxRating": 4999,
    "ImperialTitle": "Private",
    "RebelTitle": "Private",
    "RatingEarningCap": 10000,
    "RatingDecayBalance": 0,
    "MaxRatingDecay": 0,
    "RatingDecayFloor": 0
  },
  {
    "Rank": 2,
    "MinRating": 5000,
    "MaxRating": 9999,
    "ImperialTitle": "Lance Corporal",
    "RebelTitle": "Trooper",
    "RatingEarningCap": 6750,
    "RatingDecayBalance": 0,
    "MaxRatingDecay": 0,
    "RatingDecayFloor": 0
  },
  {
    "Rank": 3,
    "MinRating": 10000,
    "MaxRating": 14999,
    "ImperialTitle": "Corporal",
    "RebelTitle": "High Trooper",
    "RatingEarningCap": 6500,
    "RatingDecayBalance": 0,
    "MaxRatingDecay": 0,
    "RatingDecayFloor": 0
  },
  {
    "Rank": 4,
    "MinRating": 15000,
    "MaxRating": 19999,
    "ImperialTitle": "Sergeant",
    "RebelTitle": "Sergeant",
    "RatingEarningCap": 5750,
    "RatingDecayBalance": 0,
    "MaxRatingDecay": 0,
    "RatingDecayFloor": 0
  },
  {
    "Rank": 5,
    "MinRating": 20000,
    "MaxRating": 24999,
    "ImperialTitle": "Master Sergeant",
    "RebelTitle": "Senior Sergeant",
    "RatingEarningCap": 5500,
    "RatingDecayBalance": 0,
    "MaxRatingDecay": 0,
    "RatingDecayFloor": 0
  },
  {
    "Rank": 6,
    "MinRating": 25000,
    "MaxRating": 29999,
    "ImperialTitle": "Sergeant Major",
    "RebelTitle": "Sergeant Major",
    "RatingEarningCap": 5250,
    "RatingDecayBalance": 0,
    "MaxRatingDecay": 0,
    "RatingDecayFloor": 0
  },
  {
    "Rank": 7,
    "MinRating": 30000,
    "MaxRating": 34999,
    "ImperialTitle": "Lieutenant",
    "RebelTitle": "Lieutenant",
    "RatingEarningCap": 5000,
    "RatingDecayBalance": 2728,
    "MaxRatingDecay": 2000,
    "RatingDecayFloor": 29999
  },
  {
    "Rank": 8,
    "MinRating": 35000,
    "MaxRating": 39999,
    "ImperialTitle": "Captain",
    "RebelTitle": "Captain",
    "RatingEarningCap": 4750,
    "RatingDecayBalance": 2745,
    "MaxRatingDecay": 2000,
    "RatingDecayFloor": 0
  },
  {
    "Rank": 9,
    "MinRating": 40000,
    "MaxRating": 44999,
    "ImperialTitle": "Major",
    "RebelTitle": "Major",
    "RatingEarningCap": 4500,
    "RatingDecayBalance": 2770,
    "MaxRatingDecay": 2000,
    "RatingDecayFloor": 0
  },
  {
    "Rank": 10,
    "MinRating": 45000,
    "MaxRating": 49999,
    "ImperialTitle": "Lieutenant Colonel",
    "RebelTitle": "Commander",
    "RatingEarningCap": 4250,
    "RatingDecayBalance": 2794,
    "MaxRatingDecay": 2000,
    "RatingDecayFloor": 0
  },
  {
    "Rank": 11,
    "MinRating": 50000,
    "MaxRating": 54999,
    "ImperialTitle": "Colonel",
    "RebelTitle": "Colonel",
    "RatingEarningCap": 4000,
    "RatingDecayBalance": 2824,
    "MaxRatingDecay": 2000,
    "RatingDecayFloor": 0
  },
  {
    "Rank": 12,
    "MinRating": 55000,
    "MaxRating": 59999,
    "ImperialTitle": "General",
    "RebelTitle": "General",
    "RatingEarningCap": 3750,
    "RatingDecayBalance": 2858,
    "MaxRatingDecay": 2000,
    "RatingDecayFloor": 0
  }
];
