import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http'; 
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar'

import { AppComponent } from './app.component';
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';
import { PrescriptionTableComponent } from './prescription-table/prescription-table.component';
import { EditComponent } from './edit/edit.component';
import { BootstrapJumbotronComponent } from './bootstrap-jumbotron/bootstrap-jumbotron.component';
import { BootstrapTableComponent } from './bootstrap-table/bootstrap-table.component';
import { BootstrapModalComponent } from './bootstrap-modal/bootstrap-modal.component';

const routes: Routes = [
  {
    path: 'create',
    component: PrescriptionFormComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'index',
    component: PrescriptionTableComponent
  }
];

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule,
  ],

  declarations: [
    AppComponent,
    PrescriptionFormComponent,
    PrescriptionTableComponent,
    EditComponent,
    BootstrapJumbotronComponent,
    BootstrapTableComponent,
    BootstrapModalComponent,
  ],
  
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
