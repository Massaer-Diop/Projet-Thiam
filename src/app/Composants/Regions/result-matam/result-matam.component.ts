import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/Services/voter.service';

@Component({
  selector: 'app-result-matam',
  templateUrl: './result-matam.component.html',
  styleUrls: ['./result-matam.component.css']
})
export class ResultMatamComponent implements OnInit {

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
    this.voteService.getCandidatByRegion('Matam').subscribe((res: any) => {
      this.candidats = res
      console.log(this.candidats);   
   })
  }

}
