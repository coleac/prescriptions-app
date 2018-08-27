import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { PrescriptionFormComponent } from './prescription-form/prescription-form.component';
import { PrescriptionTableComponent } from './prescription-table/prescription-table.component';
import { EditComponent } from './edit/edit.component';
import { RegisterComponent } from './register/register.component';
import { UserResolver } from './user/user.resolver';
import { PrescriptionFormResolver } from './prescription-form/prescription-form.resolver';
import { PrescriptionTableResolver } from './prescription-table/prescription-table.resolver';
import { EditResolver } from './edit/edit.resolver';
import { AuthGuard } from './core/auth.guard';

export const rootRouterConfig: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'register', 
    component: RegisterComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'user', 
    component: UserComponent,  
    resolve: { data: UserResolver}
  },
  {
    path: 'create',
    component: PrescriptionFormComponent,
    resolve: { data: PrescriptionFormResolver}
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    resolve: { data: EditResolver}
  },
  {
    path: 'index',
    component: PrescriptionTableComponent,
    resolve: { data: PrescriptionTableResolver}
  },
  { 
    path: '**', 
    redirectTo: 'login'
  }
];