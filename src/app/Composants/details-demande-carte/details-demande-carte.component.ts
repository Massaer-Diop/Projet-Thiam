import { Component, EventEmitter, Input, OnInit, OnChanges, Output } from '@angular/core';
import { Electeur } from 'src/app/Models/electeur';
import { ToastrService } from 'ngx-toastr';
import { ElecteurService } from 'src/app/Services/electeur.service';
import { DemandeCarteService } from 'src/app/Services/demande-carte.service';
import { Router } from '@angular/router';
import { CommuneService } from 'src/app/Services/commune.service';
import { Commune } from 'src/app/Models/commune';


@Component({
  selector: 'app-details-demande-carte',
  templateUrl: './details-demande-carte.component.html',
  styleUrls: ['./details-demande-carte.component.css']
})
export class DetailsDemandeCarteComponent implements OnInit {

  @Input() demandeCarte: any;
  @Output() reactualiseDemandeCarte: EventEmitter<any> = new EventEmitter();
  currentDemandeCarte: any = null;
  commune: any;
  
  constructor(private electeurService: ElecteurService,
    private router: Router,
    private toastr: ToastrService,
    private communeService: CommuneService,
    private demandeCarteService: DemandeCarteService) { }

  ngOnInit(): void {
     this.getAllCommune();
  }

  showToastrError() {
    this.toastr.error('Some message', 'title')
  }

  showToastrSuccess() {
    this.toastr.success('Un nounveau électeur ajouté', 'Succés !!!')
  }

  ngOnChanges(): void {
    this.currentDemandeCarte = { ...this.demandeCarte };
  }

  onCreateElecteur() {
    
    if (this.currentDemandeCarte.nom_electeur === undefined || 
        this.currentDemandeCarte.prenom_electeur === undefined || 
        this.currentDemandeCarte.num_cni === undefined || 
        this.currentDemandeCarte.adresse === undefined || 
        this.currentDemandeCarte.annee_naissance === undefined || 
        this.currentDemandeCarte.commune_id === undefined) {
      this.showToastrError();
    } else {
      this.currentDemandeCarte.a_vote = 0;
      this.electeurService.create(this.currentDemandeCarte).subscribe((res) => {
        this.showToastrSuccess();
        this.onDeleteDemande();
        this.router.navigateByUrl('/listElect')
      });
    }

  }

  onDeleteDemande() {
      this.demandeCarteService.delete(this.currentDemandeCarte.id).subscribe( res =>{ 
      })
  }

  getAllCommune() {
    this.communeService.getAll().subscribe((data: Commune[]) => {
      this.commune = data;
      console.log(this.commune);
    });  
  }

}
