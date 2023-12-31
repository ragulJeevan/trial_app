import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { SitesRoutingModule } from './sites-routing.module';
import { AddSiteComponent } from './add-site/add-site.component';
import { ListSiteComponent } from './list-site/list-site.component';



@NgModule({
  declarations: [
    AddSiteComponent,
    ListSiteComponent,

  ],
  imports: [
    CommonModule,
    SitesRoutingModule,
    SharedModule
  ]
})
export class SitesModule { }
