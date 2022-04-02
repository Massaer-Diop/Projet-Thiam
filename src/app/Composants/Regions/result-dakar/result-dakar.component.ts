import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/Services/voter.service';

@Component({
  selector: 'app-result-dakar',
  templateUrl: './result-dakar.component.html',
  styleUrls: ['./result-dakar.component.css']
})
export class ResultDakarComponent implements OnInit {

  commune!: any
  region!: any
  candidats!: any

  constructor(private voteService: VoterService) { }

  ngOnInit(): void {
    this.getAllCandidatCountCommune()
    this.getAllCandidatCountRegion()
    this.getCandidatByRegion()
  }

  getAllCandidatCountCommune(){
    this.voteService.getAllCountCandidatByCommune().subscribe( res =>{
       this.commune = res      
    })
  }
  getAllCandidatCountRegion(){
    this.voteService.getAllCountCandidatByRegion().subscribe(res =>{
       this.region = res       
    })
  }

  getCandidatByCommune(){
    this.voteService.getCandidatByCommune('Saint-Louis').subscribe(res => {
      this.candidats = res
   })
  }

  getCandidatByRegion(){
    this.voteService.getCandidatByRegion('Dakar').subscribe(res => {
      this.candidats = res
   })
  }

}
