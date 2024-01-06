import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HomeComponent } from './components/home/home.component';
import { SiteListComponent } from './components/site-list/site-list.component';

//Department module routing
const departmentMOdule = () => import('src/app/modules/department/department.module').then(x => x.DepartmentModule);
//Employee module routing
const employeeMOdule = () => import('src/app/modules/employee/employee.module').then(x => x.EmployeeModule);
//Sites module routing
const sitesMOdule = () => import('src/app/modules/sites/sites.module').then(x => x.SitesModule);
//Dashboard module routing
const dashboardMOdule = () => import('src/app/modules/dashboard/dashboard.module').then(x => x.DashboardModule);
//Attendance module routing
const attendanceMOdule = () => import('src/app/modules/attendance/attendance.module').then(x => x.AttendanceModule);
// REPORT 
const report = () => import('src/app/modules/reports/reports.module').then(x => x.ReportsModule);
// SETUP 
const setup = () => import('src/app/modules/setting/setting.module').then(x => x.SettingModule);



const routes: Routes = [
  { path: '', component: SiteListComponent, canActivate: [AuthenticationGuard]  },
  { path: 'site-list', component: SiteListComponent,canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  //Department module
  { path: 'depart', loadChildren: departmentMOdule,canActivate: [AuthenticationGuard] },
  //Employee module
  { path: 'emp', loadChildren: employeeMOdule,canActivate: [AuthenticationGuard] },
  //Sites module
  { path: 'sites', loadChildren: sitesMOdule, canActivate: [AuthenticationGuard]},
  //Dashboard module
  { path: 'dashboard', loadChildren: dashboardMOdule, canActivate: [AuthenticationGuard]},
  //Attendance module
  { path: 'attendance', loadChildren: attendanceMOdule,canActivate: [AuthenticationGuard] },
  // REPORTS 
  { path: 'reports', loadChildren: report,canActivate: [AuthenticationGuard] },
  // SETUP 
  { path: 'setup', loadChildren: setup,canActivate: [AuthenticationGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
