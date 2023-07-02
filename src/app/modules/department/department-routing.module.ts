import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';

const routes: Routes = [
  { path: 'list-department', component: ListDepartmentComponent },
  {path:'department-list',component:DepartmentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
