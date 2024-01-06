import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { ListSiteComponent } from './list-site/list-site.component';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from 'src/app/guards/authentication.guard';

const routes: Routes = [
  
  { path: 'list-site', component: ListSiteComponent,canActivate: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
