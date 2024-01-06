import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { ListDepartmentComponent } from './list-department/list-department.component';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { AuthenticationGuard } from 'src/app/guards/authentication.guard';

const routes: Routes = [
  { path: 'list-department', component: ListDepartmentComponent,canActivate: [AuthenticationGuard] },
  {path:'department-list',component:DepartmentListComponent,canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
