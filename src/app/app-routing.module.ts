import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteListComponent } from './modules/sites/site-list/site-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';

//Department module routing
const departmentMOdule = () => import('src/app/modules/department/department-routing.module').then(x => x.DepartmentRoutingModule);
//Employee module routing
const employeeMOdule = () => import('src/app/modules/employee/employee-routing.module').then(x => x.EmployeeRoutingModule);
//Sites module routing
const sitesMOdule = () => import('src/app/modules/sites/sites-routing.module').then(x => x.SitesRoutingModule);
//Dashboard module routing
const dashboardMOdule = () => import('src/app/modules/dashboard/dashboard-routing.module').then(x => x.DashboardRoutingModule);
//Attendance module routing
const attendanceMOdule = () => import('src/app/modules/attendance/attendance-routing.module').then(x => x.AttendanceRoutingModule);
// REPORT 
const report = () => import('src/app/modules/reports/reports-routing.module').then(x => x.ReportsRoutingModule);
// SETUP 
const setup = () => import('src/app/modules/setting/setting-routing.module').then(x => x.SettingRoutingModule);



const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  //Department module
  { path: 'depart', loadChildren: departmentMOdule, },
  //Employee module
  { path: 'emp', loadChildren: employeeMOdule, },
  //Sites module
  { path: 'sites', loadChildren: sitesMOdule, },
  //Dashboard module
  { path: 'dashboard', loadChildren: dashboardMOdule, },
  //Attendance module
  { path: 'attendance', loadChildren: attendanceMOdule, },
  // REPORTS 
  { path: 'reports', loadChildren: report },
  // SETUP 
  { path: 'setup', loadChildren: setup }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
