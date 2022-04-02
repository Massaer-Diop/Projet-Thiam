import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './Composants/accueil/accueil.component';
import { AdminComponent } from './Composants/admin/admin.component';
import { HeaderComponent } from './Composants/header/header.component';
import { RegisterComponent } from './Composants/register/register.component';
import { ListElecteurComponent } from './Composants/list-electeur/list-electeur.component';
import { ListCandidatComponent } from './Composants/list-candidat/list-candidat.component';
import { CandidatComponent } from './Composants/candidat/candidat.component';
import { CarteElecteurComponent } from './Composants/carte-electeur/carte-electeur.component';
import { CarteComponent } from './Composants/carte/carte.component';
import { SenegalComponent } from './Composants/senegal/senegal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';

import { DemandeCarteComponent } from './Composants/demande-carte/demande-carte.component';
import { DetailsDemandeCarteComponent } from './Composants/details-demande-carte/details-demande-carte.component';
import { VoterComponent } from './Composants/voter/voter.component';
import { ResultatsComponent } from './Composants/resultats/resultats.component';
import { ResultSaintLouisComponent } from './Composants/Regions/result-saint-louis/result-saint-louis.component';
import { ResultDakarComponent } from './Composants/Regions/result-dakar/result-dakar.component';
import { ResultThiesComponent } from './Composants/Regions/result-thies/result-thies.component';
import { ResultMatamComponent } from './Composants/Regions/result-matam/result-matam.component';
import { ResultZiguinchorComponent } from './Composants/Regions/result-ziguinchor/result-ziguinchor.component';
import { ResultLougaComponent } from './Composants/Regions/result-louga/result-louga.component';
import { ResultKaolackComponent } from './Composants/Regions/result-kaolack/result-kaolack.component';
import { ResultTambaComponent } from './Composants/Regions/result-tamba/result-tamba.component';
import { ResultSedhiouComponent } from './Composants/Regions/result-sedhiou/result-sedhiou.component';
import { ResultKoldaComponent } from './Composants/Regions/result-kolda/result-kolda.component';
import { ResultKedougouComponent } from './Composants/Regions/result-kedougou/result-kedougou.component';
import { ResultKaffrineComponent } from './Composants/Regions/result-kaffrine/result-kaffrine.component';
import { ResultFatickComponent } from './Composants/Regions/result-fatick/result-fatick.component';
import { ResultDiourbelComponent } from './Composants/Regions/result-diourbel/result-diourbel.component';
import { FooterComponent } from './Composants/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AdminComponent,
    HeaderComponent,
    RegisterComponent,
    ListElecteurComponent,
    ListCandidatComponent,
    CandidatComponent,
    CarteElecteurComponent,
    CarteComponent,
    SenegalComponent,
    DemandeCarteComponent,
    DetailsDemandeCarteComponent,
    VoterComponent,
    ResultatsComponent,
    ResultSaintLouisComponent,
    ResultDakarComponent,
    ResultThiesComponent,
    ResultMatamComponent,
    ResultZiguinchorComponent,
    ResultLougaComponent,
    ResultKaolackComponent,
    ResultTambaComponent,
    ResultSedhiouComponent,
    ResultKoldaComponent,
    ResultKedougouComponent,
    ResultKaffrineComponent,
    ResultFatickComponent,
    ResultDiourbelComponent,
    FooterComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    MatDatepickerModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        preventDuplicates: true,
        
      }
    ),
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
