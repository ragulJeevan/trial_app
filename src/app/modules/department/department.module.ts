import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { SharedModule } from '../shared/shared.module';
import { DepartmentListComponent } from './department-list/department-list.component';


@NgModule({
  declarations: [
    AddDepartmentComponent,
    ListDepartmentComponent,
    DepartmentListComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule
  ]
})
export class DepartmentModule { }
