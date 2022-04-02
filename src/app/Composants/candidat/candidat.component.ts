import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Commune } from 'src/app/Models/commune';
import { ListeCandidat } from 'src/app/Models/liste-candidat';
import { CandidatService } from 'src/app/Services/candidat.service';
import { ToastrService } from 'ngx-toastr';
import { CommuneService } from 'src/app/Services/commune.service';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit {
  candidat: ListeCandidat = new ListeCandidat();
  commune: any;
  constructor(private candidatService : CandidatService, 
              private router: Router,
              private communeService: CommuneService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllCommune();
  }
  
  showToastrError(){
    this.toastr.error('Some message', 'title')
  }

  showToastrSuccess(){
    this.toastr.success('Some message', 'title')
  }

  SaveCandidat(): void {
    if( this.candidat.nom_candidat === undefined || this.candidat.prenom_candidat === undefined || this.candidat.parti_politique === undefined)
    {
        this.showToastrError();
    }else
    {
      this.candidatService.create(this.candidat).subscribe(res => {
        console.log(res);
        
        this.router.navigateByUrl('/admin/listCandid')
      });
    }
  
  }

  saveCandidat(data: any){
    console.log(data);
    this.candidatService.create(data).subscribe((res) => {
          this.showToastrSuccess();
      this.router.navigateByUrl('/admin/listCandid')
    });

  }

  getAllCommune() {
    this.communeService.getAll().subscribe((data: Commune[]) => {
      this.commune = data;
      console.log(this.commune);
    });

  }

}
