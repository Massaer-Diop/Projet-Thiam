import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './Composants/accueil/accueil.component';
import { AdminComponent } from './Composants/admin/admin.component';
import { CandidatComponent } from './Composants/candidat/candidat.component';
import { CarteElecteurComponent } from './Composants/carte-electeur/carte-electeur.component';
import { DemandeCarteComponent } from './Composants/demande-carte/demande-carte.component';
import { ListCandidatComponent } from './Composants/list-candidat/list-candidat.component';
import { ListElecteurComponent } from './Composants/list-electeur/list-electeur.component';
import { ResultDakarComponent } from './Composants/Regions/result-dakar/result-dakar.component';
import { ResultDiourbelComponent } from './Composants/Regions/result-diourbel/result-diourbel.component';
import { ResultFatickComponent } from './Composants/Regions/result-fatick/result-fatick.component';
import { ResultKaffrineComponent } from './Composants/Regions/result-kaffrine/result-kaffrine.component';
import { ResultKaolackComponent } from './Composants/Regions/result-kaolack/result-kaolack.component';
import { ResultKedougouComponent } from './Composants/Regions/result-kedougou/result-kedougou.component';
import { ResultKoldaComponent } from './Composants/Regions/result-kolda/result-kolda.component';
import { ResultLougaComponent } from './Composants/Regions/result-louga/result-louga.component';
import { ResultMatamComponent } from './Composants/Regions/result-matam/result-matam.component';
import { ResultSaintLouisComponent } from './Composants/Regions/result-saint-louis/result-saint-louis.component';
import { ResultSedhiouComponent } from './Composants/Regions/result-sedhiou/result-sedhiou.component';
import { ResultTambaComponent } from './Composants/Regions/result-tamba/result-tamba.component';
import { ResultThiesComponent } from './Composants/Regions/result-thies/result-thies.component';
import { ResultZiguinchorComponent } from './Composants/Regions/result-ziguinchor/result-ziguinchor.component';
import { RegisterComponent } from './Composants/register/register.component';
import { ResultatsComponent } from './Composants/resultats/resultats.component';
import { VoterComponent } from './Composants/voter/voter.component';

const routes: Routes = [
  { path: '', redirectTo:'/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },

  {  path: 'admin',
     component: AdminComponent,
     children:[
      { path: '', redirectTo:'/admin/elect', pathMatch: 'full' },
      { path: 'elect', component: DemandeCarteComponent },
      { path: 'cartElect', component: CarteElecteurComponent },
      { path: 'demandeCarte', component: DemandeCarteComponent },
      { path: 'candid', component: CandidatComponent },
      { path: 'listCandid', component: ListCandidatComponent },
    ]
  },


  { path: 'demandeCarte', component: DemandeCarteComponent },
  { path: 'vote', component: VoterComponent },
  { path: 'result', component: ResultatsComponent },

  { path: 'dk_result', component: ResultDakarComponent },
  { path: 'sl_result', component: ResultSaintLouisComponent },
  { path: 'th_result', component: ResultThiesComponent },
  { path: 'mt_result', component: ResultMatamComponent },
  { path: 'zg_result', component: ResultZiguinchorComponent },
  { path: 'lg_result', component: ResultLougaComponent },
  { path: 'kl_result', component: ResultKaolackComponent },
  { path: 'tc_result', component: ResultTambaComponent },
  { path: 'sd_result', component: ResultSedhiouComponent },
  { path: 'db_result', component: ResultDiourbelComponent },
  { path: 'ft_result', component: ResultFatickComponent },
  { path: 'kaf_result', component: ResultKaffrineComponent },
  { path: 'kg_result', component: ResultKedougouComponent },
  { path: 'kd_result', component: ResultKoldaComponent },

  { path: 'listElect', component: ListElecteurComponent },
  { path: 'listCandid', component: ListCandidatComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
