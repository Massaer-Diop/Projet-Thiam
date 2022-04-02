import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ListeCandidat } from 'src/app/Models/liste-candidat';
import { AuthentificationService } from 'src/app/Services/authentification.service';
import { CandidatService } from 'src/app/Services/candidat.service';
import { ElecteurService } from 'src/app/Services/electeur.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Log_cni!: number;
  Log_nom!: string;
  Log_prenom!: string;
  electeur : any;
  modiferProfil : ListeCandidat = new ListeCandidat();
  profilCandidat : any;
  candidat : any;
  LogEmail!: string;
  LogPassword!: string;
  errorMessage: string = '';
  succesMessage: string = '';
  admin_btn = false;
  vote_btn = false;
  modalRef?: BsModalRef;
  profil: boolean = false;

  constructor(private authService: AuthentificationService,
    private route: Router,
    private electeurService: ElecteurService,
    private candidatService: CandidatService,
    private modalService: BsModalService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.affiche();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  showToastrError() {
    this.toastr.error(this.errorMessage, 'Erreur')
  }

  showToastrSuccess() {
    this.toastr.success(this.succesMessage, 'Succés !!!')
  }

  afficheBtn() {
    if (localStorage.getItem('user')) {
      return true;
    }
    return false;
  }

  affiche()
  {
    if(localStorage.getItem('user')){
       if(this.electeur.num_cni !== null){
         this.vote_btn = true; 
       }
       if(this.candidat.num_cni_candidat !== null){
         this.vote_btn = true;
         this.profil = true;
       }
    }
  }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    if (this.ValiderFormAdmin(email, password)) {
      this.authService.loginAdmin(email, password).subscribe((res : any) =>{
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res.email))
        this.succesMessage = res.name+" s'est connecté comme administrateur";
        this.admin_btn = true;
        this.showToastrSuccess();
        this.modalRef?.hide();
        this.route.navigate(['/admin']);
     }, err =>{
       console.log(err);
       
     })
    }else{
      this.showToastrError();
    }
  }

  onConnectElecteur() {
    if (this.ValiderForm(this.Log_prenom, this.Log_nom, this.Log_cni)) {
      this.electeurService.searchCNI(this.Log_cni).subscribe((res: any) => {
        this.electeur = res;
        if(this.electeur === null)
        {
          console.log(res);
          this.errorMessage = "Ce numéro de carte d'identité: "+this.Log_cni+" n'existe pas";
          this.showToastrError();
        }
        if (this.electeur.prenom_electeur === this.Log_prenom && this.electeur.nom_electeur === this.Log_nom && this.electeur.num_cni === this.Log_cni) {
            localStorage.setItem('user', JSON.stringify(this.electeur.num_cni))
            this.succesMessage = "L'électeur "+this.Log_prenom+' '+this.Log_nom+" s'est connecté";
            this.vote_btn = true;
            this.showToastrSuccess();
            this.modalRef?.hide();
            this.route.navigate(['/accueil']);
        }
        else{
          this.errorMessage = "Prenom et Nom ne correspond avec ce numéro de carte d'identité: "+this.Log_cni;
          this.showToastrError();
        }
        this.modalRef?.hide();
      })
    }else{
      this.showToastrError();
    }
  }

  onConnectCandidat() {
    if (this.ValiderForm(this.Log_prenom, this.Log_nom, this.Log_cni)) {
      this.candidatService.searchCNI(this.Log_cni).subscribe((res: any) => {
        this.candidat = res;
        if(this.candidat === null)
        {
          console.log(res);
          this.errorMessage = "Ce numéro de carte d'identité: "+this.Log_cni+" n'existe pas";
          this.showToastrError();
        }
        if (this.candidat.prenom_candidat === this.Log_prenom && this.candidat.nom_candidat === this.Log_nom && this.candidat.num_cni_candidat === this.Log_cni) {
          localStorage.setItem('user', JSON.stringify(this.candidat.num_cni_candidat))
          this.modiferProfil.num_cni_candidat = this.candidat.num_cni_candidat
          this.modiferProfil.parti_politique = this.candidat.parti_politique
            this.succesMessage = "Le candidat Mr/Mme "+this.Log_prenom+' '+this.Log_nom+" s'est connecté";
            this.vote_btn = true;
            this.profil = true;
            this.showToastrSuccess();
            this.modalRef?.hide();
            this.route.navigate(['/accueil']);
        }
        else{
          this.errorMessage = "Prenom et Nom ne correspond avec ce numéro de carte d'identité: "+this.Log_cni;
          this.showToastrError();
        }
        this.modalRef?.hide();
      })
      
    }else{
      this.showToastrError();
    }
  }

  getModifierProfil() {

    if (this.modiferProfil.num_cni_candidat === undefined || this.modiferProfil.programme === undefined ) {
      this.errorMessage = "Remplir les champs vides !!!"
      this.showToastrError();
    } else {
      if (this.Validerform(this.modiferProfil.num_cni_candidat)) {
        this.candidatService.searchCNI(this.modiferProfil.num_cni_candidat).subscribe(res => {
          this.profilCandidat = res
          if (this.profilCandidat === null) {
            this.errorMessage = "Le " + this.modiferProfil.num_cni_candidat + " entré ne se trouve pas dans la liste des candidats "
            this.showToastrError();
          } else {
            console.log(this.electeur);
            this.profilCandidat.programme = this.modiferProfil.programme;
            this.profilCandidat.parti_politique = this.modiferProfil.parti_politique;
            this.candidatService.update(this.profilCandidat.num_cni_candidat, this.profilCandidat).subscribe(res => {
              this.succesMessage = "Vous avez modifié votre progamme"
              this.showToastrSuccess();
              this.modalRef?.hide();            })
          }
        })
      } else {
        this.showToastrError();
      }
       
    }
  }

  Validerform(cni: number) {
    if (cni === undefined) {
      this.errorMessage = "Veuillez entrer votre numéro de carte d'identité !!!";
      return false;
    }
    if (cni.toString()[0] !== '1' && cni.toString()[0] !== '2') {
      this.errorMessage = "Le numéro de carte d'identité doit toujours commencer par 1 ou 2 !!!";
      return false;
    }

    if (cni.toString().length !== 13) {
      this.errorMessage = "Le numéro saisi est incorrect !!!";
      return false;
    }
    this.errorMessage = "";
    return true;
  }

  seDeconnecter() {
    console.log("Déconnecter avec l' email : " + localStorage.getItem('user'));
    localStorage.removeItem('user');
    this.vote_btn = false;
    this.profil = false;
    this.admin_btn = false;
    this.route.navigate(['/accueil']);
  }

  openModal1(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ValiderForm(prenom: string, nom: string, cni: number) {
    if (prenom === undefined) {
      this.errorMessage = "Veuillez entrer votre prenom !!!";
      return false;
    }
    if (prenom.length <= 2) {
      this.errorMessage = prenom + " : n'est pas un prenom !!!";
      return false;
    }
    if (nom === undefined) {
      this.errorMessage = "Veuillez entrer votre nom !!!";
      return false;
    }
    if (nom.length <= 1) {
      this.errorMessage = nom + " : n'est pas un nom !!!";
      return false;
    }

    if (cni === undefined) {
      this.errorMessage = "Veuillez entrer votre numéro de carte d'identité !!!";
      return false;
    }
    if (cni.toString()[0] !== '1' && cni.toString()[0] !== '2') {
      this.errorMessage = "Le numéro de carte d'identité doit toujours commencer par 1 ou 2 !!!";
      return false;
    }

    if (cni.toString().length !== 13) {
      this.errorMessage = "Le numéro saisi est incorrect !!!";
      return false;
    }
    this.errorMessage = "";
    return true;
  }

  ValiderFormAdmin(Email: string, Mdp: string) {
    if (Email === undefined) {
      this.errorMessage = "Veuillez entrer votre Email !!!";
      return false;
    }
    if (Email.length <= 10) {
      this.errorMessage = Email + " : n'est pas une adresse Email !!!";
      return false;
    }
    if (Mdp === undefined) {
      this.errorMessage = "Veuillez entrer votre Mot de passe !!!";
      return false;
    }
    if (Mdp.length <= 7) {
      this.errorMessage = "Mot de passe ne doit pas contenir moins de 8 caractéres !!!";
      return false;
    }
    this.errorMessage = "";
    return true;
  }

}
