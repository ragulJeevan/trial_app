import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { CreateSetupComponent } from './create-setup/create-setup.component';
import { ShiftComponent } from './shift/shift.component';
import { RoleComponent } from './role/role.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateSetupComponent,
    ShiftComponent,
    RoleComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingModule { }
