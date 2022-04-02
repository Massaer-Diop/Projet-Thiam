import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Commune } from 'src/app/Models/commune';
import { ListeDemande } from 'src/app/Models/liste-demande';
import { CommuneService } from 'src/app/Services/commune.service';
import { DemandeCarteService } from 'src/app/Services/demande-carte.service';

@Component({
  selector: 'app-carte-electeur',
  templateUrl: './carte-electeur.component.html',
  styleUrls: ['./carte-electeur.component.css']
})
export class CarteElecteurComponent implements OnInit {

  carte_Electeur: ListeDemande = new ListeDemande();
  commune: any;
  constructor(private router: Router,
    private toastr: ToastrService,
    private communeService: CommuneService,
    private demandeService: DemandeCarteService) { }

  ngOnInit(): void {
    this.getAllCommune();
  }

  showToastrError() {
    this.toastr.error('Some message', 'Erreur')
  }

  showToastrSuccess() {
    this.toastr.success('Some message', 'Succés')
  }

  getDemandeCarte(data: any) {
    if (data.nom === undefined || data.prenom === undefined || data.num_cni === undefined || data.adresse === undefined || data.annee_naissance === undefined || data.commune_id === undefined) {
        this.showToastrError();
    } else {
      this.demandeService.create(data).subscribe((res) => {
        this.showToastrSuccess();
        this.router.navigateByUrl('/admin/demandeCarte')
      });

    }
    console.log(data);

  }

  getAllCommune() {
    this.communeService.getAll().subscribe((data: Commune[]) => {
      this.commune = data;
      console.log(this.commune);
    });

  }

}
