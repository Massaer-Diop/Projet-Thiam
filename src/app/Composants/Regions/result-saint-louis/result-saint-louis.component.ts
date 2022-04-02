import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/Services/voter.service';

@Component({
  selector: 'app-result-saint-louis',
  templateUrl: './result-saint-louis.component.html',
  styleUrls: ['./result-saint-louis.component.css']
})
export class ResultSaintLouisComponent implements OnInit {

  constructor(private voteService: VoterService) { }
  candidats!: any
  ngOnInit(): void {
    this.getCandidatByRegion()
  }

  getCandidatByRegion(){
    this.voteService.getCandidatByRegion('Saint-Louis').subscribe(res => {
      this.candidats = res
      console.log(this.candidats);   
   })
  }

}
