import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/Services/voter.service';

@Component({
  selector: 'app-result-thies',
  templateUrl: './result-thies.component.html',
  styleUrls: ['./result-thies.component.css']
})
export class ResultThiesComponent implements OnInit {

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
    this.voteService.getCandidatByRegion('Thiés').subscribe((res: any) => {
      this.candidats = res
      console.log(this.candidats);   
   })
  }

}
