import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Electeur } from 'src/app/Models/electeur';
import { Vote } from 'src/app/Models/vote';
import { CandidatService } from 'src/app/Services/candidat.service';
import { ElecteurService } from 'src/app/Services/electeur.service';
import { VoterService } from 'src/app/Services/voter.service';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.css']
})
export class VoterComponent implements OnInit {

  Log_numElecteur: any;
  electeur : any
  bloque = false;
  vote : Vote = new Vote()
  currentCandidat : any;
  currentIndex = -1;
  electeurs : any
  candidats : any
  isConnect = false;
  errorMessage = "";
  succesMessage = "";
  modalRef?: BsModalRef;

  constructor( private electeurService: ElecteurService,
               private candidatService: CandidatService,
               private voterService: VoterService,
               private route: Router,
               private modalService: BsModalService,
               private toastr: ToastrService,) { }

  ngOnInit(): void {

  }

  openModal(template: TemplateRef<any>, candidat: any, index: number) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.setActiveCandidat(candidat, index)
  }

  confirm(): void {
    if(this.electeurs.a_vote === 0){
      this.vote.annee_vote_id = 1;
      this.vote.liste_candidat_id = this.currentCandidat.id;
      console.log(this.vote);
      this.voterService.create(this.vote).subscribe( res => {
         console.log(res);
         this.succesMessage = 'Félicitation !!! '+this.electeurs.prenom_electeur+' '+this.electeurs.nom_electeur+' vous avez voté pour Mr/Mme '+this.currentCandidat.prenom_candidat+' '+this.currentCandidat.nom_candidat;
         this.showToastrSuccess();
      })
      this.electeurs.a_vote = 1
      this.electeurService.update(this.electeurs.id, this.electeurs).subscribe(res =>{
         this.electeurs = res
         console.log(this.electeurs);
      })

      this.modalRef?.hide();
      this.route.navigate(['/accueil']);
    }else{
      this.errorMessage = 'Désolé !!! '+this.electeurs.prenom_electeur+' '+this.electeurs.nom_electeur+' vous avez déja voté';
      this.showToastrError();
      this.modalRef?.hide();
    }
  }

  decline(): void {
    this.errorMessage = 'Le vote a été annulé';
    this.showToastrError();
    this.modalRef?.hide();
  }

  showToastrError() {
    this.toastr.error(this.errorMessage, 'Désolé !!!')
  }

  showToastrSuccess() {
    this.toastr.success(this.succesMessage, 'Succés !!!')
  }

  onConnect() {
    if (this.ValiderForm(this.Log_numElecteur)) {
      this.electeurService.searchByNumElecteur(this.Log_numElecteur).subscribe((res: any) => {
        this.electeur = res;
        if(this.electeur === null)
        {
          this.errorMessage = "Ce numéro de carte d'électeur: "+this.Log_numElecteur+" n'existe pas";
          this.showToastrError();
          this.isConnect = false;
        }
        if (this.electeur.num_electeur === this.Log_numElecteur) {
            this.succesMessage = "Connection réussie !!!";
            this.showToastrSuccess();
            this.electeurService.FindCommuneRegion(this.electeur.num_cni).subscribe((res: any) => {
              this.electeurs = res;
              if(this.electeurs.a_vote === 1){
                 this.bloque = true
              }
              this.isConnect = true;
              this.candidatService.FindAllCandidatCommune(this.electeurs.nom_commune).subscribe((res: any) =>{
                this.candidats = res;
                console.log(this.candidats);
            })
              console.log(this.electeurs);
          })
        }
      })
    }else{
      this.showToastrError();
    }
  }

  getCommuneRegionElecteur()
  {
    if(localStorage.getItem('user') !== null){
      this.electeurService.FindCommuneRegion(this.electeurs.num_cni).subscribe((res: any) => {
          this.electeurs = res;
          console.log(this.electeurs);
      })
    }else{
      console.log('this.electeurs');
    }
  }

  connect()
  {
    if(this.Log_numElecteur !== null)
    {
       return this.isConnect = true;
    }
    return this.isConnect = false;
  }

  ValiderForm(cni: number) {
    if (cni === undefined) {
      this.errorMessage = "Veuillez entrer votre numéro de carte électeur !!!";
      return false;
    }
    if (cni.toString()[0] !== '1' && cni.toString()[0] !== '2') {
      this.errorMessage = "Le numéro de carte d'identité doit toujours commencer par 1 ou 2 !!!";
      return false;
    }

    if (cni.toString().length !== 9) {
      this.errorMessage = "Le numéro de carte d'électeur comporte 9 caractéres !!!";
      return false;
    }

    return true;
  }

  setActiveCandidat(candidat: any, index: number): void {
    this.currentCandidat = candidat;
    this.currentIndex = index;
  }

}
