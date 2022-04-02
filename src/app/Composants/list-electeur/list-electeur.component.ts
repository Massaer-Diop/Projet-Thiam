import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Electeur } from 'src/app/Models/electeur';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Commune } from 'src/app/Models/commune';
import { ListeDemande } from 'src/app/Models/liste-demande';
import { CommuneService } from 'src/app/Services/commune.service';
import { DemandeCarteService } from 'src/app/Services/demande-carte.service';
import { ElecteurService } from 'src/app/Services/electeur.service';

@Component({
  selector: 'app-list-electeur',
  templateUrl: './list-electeur.component.html',
  styleUrls: ['./list-electeur.component.css']
})
export class ListElecteurComponent implements OnInit {

  electeurs: any;
  electeur: any;
  search_cni: any;
  modalRef?: BsModalRef;
  demandeCarte: any;
  carte_Electeur: ListeDemande = new ListeDemande();
  changerLieu: Electeur = new Electeur();
  commune: any;
  errorMessage = "";
  succesMessage = "";
  constructor(private electeurService: ElecteurService,
    private modalService: BsModalService,
    private router: Router,
    private toastr: ToastrService,
    private communeService: CommuneService,
    private demandeService: DemandeCarteService) { }

  ngOnInit(): void {
    this.getAllCommune();
    this.getAllElecteurs()
  }


  getAllElecteurs() {
    this.electeurService.getAll().subscribe((data: Electeur[]) => {
      this.electeurs = data;
      console.log(this.electeurs);

    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getSearch() {
    if (this.ValiderForm(this.search_cni)) {
      this.electeurService.search(this.search_cni).subscribe(res => {
        if (res !== undefined) {
          this.electeurs = res;
          console.log(this.electeurs);
          this.succesMessage = 'Le numéro entré est correct !!!';
          this.showToastrSuccess();
        } else {
          this.errorMessage = "Le " + this.search_cni + " entré ne se trouve pas dans la liste des électeurs "
          this.showToastrError()
        }
      })
    }
    else {
      this.showToastrError();
    }

  }

  showToastrError() {
    this.toastr.error(this.errorMessage, 'Erreur')
  }

  showToastrSuccess() {
    this.toastr.success(this.succesMessage, 'Succés')
  }


  getDemandeCarte() {
    if (this.carte_Electeur.prenom === undefined || this.carte_Electeur.nom === undefined || this.carte_Electeur.adresse === undefined || this.carte_Electeur.annee_naissance === undefined || this.carte_Electeur.num_cni === undefined || this.carte_Electeur.commune_id === undefined) {
      this.errorMessage = "Remplir les champs vides !!!";
      this.showToastrError();
    } else {
      if (this.ValiderForm(this.carte_Electeur.num_cni)) {
          this.demandeService.searchCNI(this.carte_Electeur.num_cni).subscribe(res => {
              this.demandeCarte = res;
              if(this.demandeCarte === null){
                this.demandeService.create(this.carte_Electeur).subscribe((res) => {
                  this.succesMessage = "Votre demande a été ajoutée"
                  this.showToastrSuccess();
                  this.modalRef?.hide()
                });
              }else{
                this.errorMessage = "Cette demande est dans la liste"
                this.showToastrError();
                this.modalRef?.hide()
              }
          })
      } else {
        this.showToastrError();
      }

    }

  }

  getChangerLieu() {

    if (this.changerLieu.adresse === undefined || this.changerLieu.num_cni === undefined || this.changerLieu.commune_id === undefined) {
      this.errorMessage = "Remplir les champs vides !!!"
      this.showToastrError();
    } else {
      if (this.ValiderForm(this.changerLieu.num_cni)) {
        this.electeurService.searchCNI(this.changerLieu.num_cni).subscribe(res => {
          this.electeur = res
          if (this.electeur === null) {
            this.errorMessage = "Le " + this.changerLieu.num_cni + " entré ne se trouve pas dans la liste des électeurs "
            this.showToastrError();
          } else {
            console.log(this.electeur);
            this.electeur.adresse = this.changerLieu.adresse;
            this.electeur.commune_id = this.changerLieu.commune_id;
            this.electeurService.update(this.changerLieu.num_cni, this.electeur).subscribe(res => {
              this.succesMessage = "Vous avez changé lieu de vote"
              this.showToastrSuccess();
              this.getAllElecteurs();

              this.router.navigateByUrl('/listElect')
              console.log(res);
            })
          }
        })
      } else {
        this.showToastrError();
      }

    }
  }

  getAllCommune() {
    this.communeService.getAll().subscribe((data: Commune[]) => {
      this.commune = data;
      console.log(this.commune);
    });

  }

  ValiderForm(cni: number) {
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

}
