import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/Services/voter.service';

@Component({
  selector: 'app-result-kaolack',
  templateUrl: './result-kaolack.component.html',
  styleUrls: ['./result-kaolack.component.css']
})
export class ResultKaolackComponent implements OnInit {

  commune!: any
  region!: any
  candidats!: any

  constructor(private voteService: VoterService) { }

  ngOnInit(): void {
  }

  getAllCandidatCountCommune(){
    this.voteService.getAllCountCandidatByCommune().subscribe( (res: any) =>{
       this.commune = res
       console.log(this.commune);       
    })
  }
  getAllCandidatCountRegion(){
    this.voteService.getAllCountCandidatByRegion().subscribe((res: any) =>{
       this.region = res
       console.log(this.region);
       
    })
  }

  getCandidatByRegion(){
    this.voteService.getCandidatByRegion('Diourbel').subscribe((res: any) => {
      this.candidats = res
      console.log(this.candidats);   
   })
  }

}
