import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Commune } from 'src/app/Models/commune';
import { Electeur } from 'src/app/Models/electeur';
import { ListeCandidat } from 'src/app/Models/liste-candidat';
import { CandidatService } from 'src/app/Services/candidat.service';
import { CommuneService } from 'src/app/Services/commune.service';
import { ElecteurService } from 'src/app/Services/electeur.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  candidat: ListeCandidat = new ListeCandidat();
  electeur: any;
  electeurVerif!: any[];
  modalRef?: BsModalRef;
  btn_cache = true;
  commune: any;
  errorMessage: string = "";
  succesMessage: string = "";
  constructor(private router: Router,
    private candidatService: CandidatService,
    private electeurtService: ElecteurService,
    private modalService: BsModalService,
    private communeService: CommuneService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllCommune();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  showToastrError() {
    this.toastr.error(this.errorMessage, 'Erreur')
  }

  showToastrSuccess() {
    this.toastr.success(this.succesMessage, 'Succés')
  }

  getAllEleceteurs() {
    this.electeurtService.getAll().subscribe(res => {
      this.electeurVerif = res
      console.log(this.electeurVerif);

    })
  }

  confirmerNouvelle(): void {
    this.getAllEleceteurs()
    for (let elet of this.electeurVerif) {
      elet.a_vote = 0
      this.electeurtService.update(elet.num_cni, elet).subscribe(res => {
        console.log(res);
      })
    }
    this.btn_cache = false
    this.succesMessage = "..."
    this.showToastrSuccess()
    this.modalRef?.hide();
  }

  confirmerArret(): void {
    this.getAllEleceteurs()
    for (let elet of this.electeurVerif) {
      elet.a_vote = 1
      this.electeurtService.update(elet.num_cni, elet).subscribe(res => {
        console.log(res);
      })
    }
    this.btn_cache = true
    this.succesMessage = "..."
    this.showToastrSuccess()
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }

  saveCandidat() {

    if (this.candidat.programme === undefined || this.candidat.parti_politique === undefined || this.candidat.num_cni_candidat === undefined) {
      this.errorMessage = "Remplir les champs vides !!!"
      this.showToastrError();
    } else {
      if (this.ValiderForm(this.candidat.num_cni_candidat)) {
        this.electeurtService.searchCNI(this.candidat.num_cni_candidat).subscribe((res: any) => {
          this.electeur = res;
          if (this.electeur === null) {
            this.errorMessage = "Ce numéro de carte d'identité: " + this.candidat.num_cni_candidat + " n'existe pas dans la liste des électeurs";
            this.showToastrError();
            this.modalRef?.hide()
          } else {
            this.candidat.nom_candidat = this.electeur.nom_electeur;
            this.candidat.prenom_candidat = this.electeur.prenom_electeur;
            this.candidat.commune_id = this.electeur.commune_id;
            this.candidat.image = "";
            console.log(this.candidat);
            this.candidatService.create(this.candidat).subscribe(res => {
              this.succesMessage = this.electeur.prenom_electeur + "" + this.electeur.nom_electeur + "a été ajouté comme nouveau candidat";
              this.showToastrSuccess();
              this.modalRef?.hide()
            });
          }
        });
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
