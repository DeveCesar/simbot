import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

// Dashboard
import { DashboardV1Page } from './pages/dashboard/v1/dashboard-v1';
import { DashboardV2Page } from './pages/dashboard/v2/dashboard-v2';
import { DashboardV3Page } from './pages/dashboard/v3/dashboard-v3';
import { RegisterUserComponent } from './pages/register-user/register-user.component';

import { LoginV1Page } from './pages/login/login-v1/login-v1';

import { TableBasicPage }           from './pages/tables/table-basic/table-basic';
import { TableDataPage }           from './pages/tables/table-data/table-data';

const routes: Routes = [
  { path: '', redirectTo: 'login/v1', pathMatch: 'full' },
  { path: 'login/v1', component: LoginV1Page, data: { title: 'Login V1' } },
  { path: 'dashboard/v1', component: DashboardV1Page, data: { title: 'Dashboard V1' } },
  { path: 'dashboard/v2', component: DashboardV2Page, data: { title: 'Dashboard V2' } },
  { path: 'dashboard/v3', component: DashboardV3Page, data: { title: 'Dashboard V3' } },

  //Registro de usuarios
  { path: 'registroUsuarios', component: RegisterUserComponent, data: { title: 'Registro Usuarios' } },

  //tablas
  { path: 'tabla1', component: TableBasicPage },
  { path: 'tabla2', component: TableDataPage },


];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})


export class AppRoutingModule { }
