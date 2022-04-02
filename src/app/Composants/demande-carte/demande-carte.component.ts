import { Component, OnInit, Input, OnChanges, Output,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ListeDemande } from 'src/app/Models/liste-demande';
import { ToastrService } from 'ngx-toastr';
import { ElecteurService } from 'src/app/Services/electeur.service';
import { Router } from '@angular/router';
import { CommuneService } from 'src/app/Services/commune.service';
import { Commune } from 'src/app/Models/commune';
import { DemandeCarteService } from 'src/app/Services/demande-carte.service';

@Component({
  selector: 'app-demande-carte',
  templateUrl: './demande-carte.component.html',
  styleUrls: ['./demande-carte.component.css']
})
export class DemandeCarteComponent implements OnInit {

  demandeCarte: any;
  search_cni: any;
  elect : any;
  modalRef?: BsModalRef;
  currentDemandeCarte: any;
  currentIndex = -1;
  commune: any;
  errorMessage: string = "";
  succesMessage: string = "";

  constructor( private demandeService : DemandeCarteService,
    private electeurService: ElecteurService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private communeService: CommuneService,
    private demandeCarteService: DemandeCarteService) { }

  ngOnInit(): void {
    this.getAllDemandeCarte();
    this.getAllCommune();
  }

  openModal(template: TemplateRef<any>, demandeCarte: any, index: number) {
    this.modalRef = this.modalService.show(template);
    this.setActiveDemandeCarte(demandeCarte, index)
  }

 showToastrError() {
   this.toastr.error(this.errorMessage, 'Erreur !!!')
 }

 showToastrSuccess() {
   this.toastr.success('Un nounveau électeur ajouté', 'Succés !!!')
 }

 ngOnChanges(): void {
   this.currentDemandeCarte = { ...this.demandeCarte };
 }

 onCreateElecteur() {
   this.currentDemandeCarte.nom_electeur = this.currentDemandeCarte.nom
   this.currentDemandeCarte.prenom_electeur = this.currentDemandeCarte.prenom
   this.currentDemandeCarte.num_electeur = this.currentDemandeCarte.numero

   console.log(this.currentDemandeCarte.num_electeur);
   
   if (this.currentDemandeCarte.nom_electeur === undefined || 
       this.currentDemandeCarte.prenom_electeur === undefined || 
       this.currentDemandeCarte.num_cni === undefined ||
       this.currentDemandeCarte.num_electeur === undefined || 
       this.currentDemandeCarte.adresse === undefined || 
       this.currentDemandeCarte.annee_naissance === undefined || 
       this.currentDemandeCarte.commune_id === undefined) {
     this.showToastrError();
   } else {
     this.currentDemandeCarte.a_vote = 0;
     if(this.ValiderForm(this.currentDemandeCarte.num_electeur)){
       this.electeurService.searchByNumElecteur(this.currentDemandeCarte.num_electeur).subscribe(res =>{
          this.elect = res;
          if(this.elect === null){
            this.electeurService.create(this.currentDemandeCarte).subscribe((res) => {
              this.succesMessage = "Votre demande a été ajoutée"
              this.showToastrSuccess();
              this.onDeleteDemande();
              this.router.navigateByUrl('/listElect')
              this.modalRef?.hide()
            });
          }else{
            this.errorMessage = "Cet électeur existe déja"
            this.showToastrError();
            this.modalRef?.hide()
          }
       })
     
     }else{
       this.showToastrError();
     }
     
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

  getAllDemandeCarte(){
     this.demandeService.getAll().subscribe((data: ListeDemande[]) =>{
        this.demandeCarte = data;
        console.log(this.demandeCarte);
        
     })
  }


  reactualiseDemandeCarte(): void {
    this.currentDemandeCarte = null;
    this.currentIndex = -1;
    this.getAllDemandeCarte();
  }

  setActiveDemandeCarte(demandeCarte: any, index: number): void {
    this.currentDemandeCarte = demandeCarte;
    this.currentIndex = index;
  }

  ValiderForm(cni: number) {
    if (cni === undefined) {
      this.errorMessage = "Veuillez entrer le numéro électeur !!!";
      return false;
    }
    if (cni.toString()[0] !== '1' && cni.toString()[0] !== '2') {
      this.errorMessage = "Le numéro électeur doit toujours commencer par 1 ou 2 !!!";
      return false;
    }

    if (cni.toString().length !== 9) {
      this.errorMessage = "Le numéro saisi est incorrect !!!";
      return false;
    }
    this.errorMessage = "";
    return true;
  }

}
