import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/Services/voter.service';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.css']
})
export class ResultatsComponent implements OnInit {

  commune!: any
  region!: any
  candidats!: any

  constructor(private voteService: VoterService) { }

  ngOnInit(): void {
    this.getAllCandidatCountCommune()
    this.getAllCandidatCountRegion()
    this.getCandidatByCommune()
  }

  getAllCandidatCountCommune(){
    this.voteService.getAllCountCandidatByCommune().subscribe( res =>{
       this.commune = res
       console.log(this.commune);       
    })
  }
  getAllCandidatCountRegion(){
    this.voteService.getAllCountCandidatByRegion().subscribe(res =>{
       this.region = res
       console.log(this.region);
       
    })
  }

  getCandidatByCommune(){
    this.voteService.getCandidatByCommune('Saint-Louis').subscribe(res => {
      this.candidats = res
      console.log(this.candidats);   
   })

  }
}
