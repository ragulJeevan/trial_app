import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { ListSiteComponent } from './list-site/list-site.component';
import { Routes, RouterModule } from '@angular/router';
import { SiteListComponent } from './site-list/site-list.component';

const routes: Routes = [
  { path: 'site-list', component: SiteListComponent },
  {path:'list-site',component:ListSiteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitesRoutingModule { }
