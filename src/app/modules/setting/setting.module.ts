import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { CreateSetupComponent } from './create-setup/create-setup.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    CreateSetupComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule
  ]
})
export class SettingModule { }
