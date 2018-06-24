import { Component, OnInit } from '@angular/core';
import {ranks, Rank, RankDisplay} from '../panel/ranks'
@Component({
  selector: 'app-howitworks',
  templateUrl: './howitworks.component.html',
  styleUrls: ['./howitworks.component.css']
})
export class HowitworksComponent implements OnInit {

  ranks:Rank[] = ranks;
  cols:string[]=RankDisplay;
  constructor() { }

  ngOnInit() {
  }

}
