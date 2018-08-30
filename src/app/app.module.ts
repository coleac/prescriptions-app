import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http'; 
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { RouterModule} from '@angular/router';
import { NgProgressModule } from '@ngx-progressbar/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';
import { PrescriptionTableComponent } from './prescription-table/prescription-table.component';
import { EditComponent } from './edit/edit.component';
import { BootstrapJumbotronComponent } from './bootstrap-jumbotron/bootstrap-jumbotron.component';
import { BootstrapTableComponent } from './bootstrap-table/bootstrap-table.component';
import { BootstrapModalComponent } from './bootstrap-modal/bootstrap-modal.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/auth.guard';
import { UserResolver } from './user/user.resolver';
import { PrescriptionFormResolver } from './prescription-form/prescription-form.resolver';
import { PrescriptionTableResolver } from './prescription-table/prescription-table.resolver';
import { EditResolver } from './edit/edit.resolver';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { rootRouterConfig } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { DatePipe, CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { PasswordComponent } from './password/password.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
   // RouterModule.forRoot(routes, { useHash:true }),
    RouterModule.forRoot(rootRouterConfig, { useHash:false }),
    NgProgressModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],

  declarations: [
    AppComponent,
    PrescriptionFormComponent,
    PrescriptionTableComponent,
    EditComponent,
    BootstrapJumbotronComponent,
    BootstrapTableComponent,
    BootstrapModalComponent,
    RegisterComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    PasswordComponent
  ],
  
  providers: [DataService, AuthService, UserService, AuthGuard, UserResolver, PrescriptionFormResolver, PrescriptionTableResolver, EditResolver, DatePipe, CurrencyPipe, DecimalPipe, PercentPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
