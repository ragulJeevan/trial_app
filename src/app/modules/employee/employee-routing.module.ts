import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
import { ListEmployeeComponent } from './list-employee/list-employee.component';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthenticationGuard } from 'src/app/guards/authentication.guard';

const routes: Routes = [
  { path: 'list-employee', component: ListEmployeeComponent,canActivate: [AuthenticationGuard] },
  { path: 'employee-list', component: EmployeeListComponent,canActivate: [AuthenticationGuard] },
  { path: 'users', component: UserListComponent,canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
