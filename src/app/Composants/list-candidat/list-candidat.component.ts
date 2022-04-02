import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Commune } from 'src/app/Models/commune';
import { ListeCandidat } from 'src/app/Models/liste-candidat';
import { CandidatService } from 'src/app/Services/candidat.service';
import { ToastrService } from 'ngx-toastr';
import { CommuneService } from 'src/app/Services/commune.service';
@Component({
  selector: 'app-list-candidat',
  templateUrl: './list-candidat.component.html',
  styleUrls: ['./list-candidat.component.css']
})
export class ListCandidatComponent implements OnInit {

  candidats: any;
  search_name: any;
  currentCandidat : any;
  currentIndex = -1;
  imageDirectoryPath:any = "http://127.0.0.1:8000/public/candidat"
  modalRef?: BsModalRef;
  candidat: ListeCandidat = new ListeCandidat();
  commune: any;
  constructor( private candidatService : CandidatService,
               private router: Router,
               private modalService: BsModalService, 
               private communeService: CommuneService,
               private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAllCandidats()
    this.getAllCommune();
  }

  getAllCandidats(){
     this.candidatService.findAllCandidat().subscribe((data: ListeCandidat) =>{
        this.candidats = data;
        console.log(this.candidats);
        
     })
  }

  getSearch(){
     this.candidatService.search(this.search_name).subscribe( res =>{
      this.candidats = res;
      console.log(this.candidats);
     })
  }

  showToastrError(){
    this.toastr.error('Some message', 'title')
  }

  showToastrSuccess(){
    this.toastr.success('Some message', 'title')
  }

  // SaveCandidat(): void {
  //   if( this.candidat.nom_candidat === undefined || this.candidat.prenom_candidat === undefined || this.candidat.parti_politique === undefined)
  //   {
  //       this.showToastrError();
  //   }else
  //   {
  //     this.candidatService.create(this.candidat).subscribe(res => {
  //       console.log(res);
        
  //       this.router.navigateByUrl('/admin/listCandid')
  //     });
  //   }
  
  // }

  saveCandidat(data: any){
    console.log(data);
    this.candidatService.create(data).subscribe((res) => {
          this.showToastrSuccess();
      this.router.navigateByUrl('/admin/listCandid')
    });

  }

  openModal1(template: TemplateRef<any>, candidat: any, index: number) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.setActiveCandidat(candidat, index)
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getAllCommune() {
    this.communeService.getAll().subscribe((data: Commune[]) => {
      this.commune = data;
      console.log(this.commune);
    }); 
   }

   setActiveCandidat(candidat: any, index: number): void {
    this.currentCandidat = candidat;
    this.currentIndex = index;
  }
}
