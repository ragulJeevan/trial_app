import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSetupComponent } from './create-setup/create-setup.component';
import { ShiftComponent } from './shift/shift.component';
import { RoleComponent } from './role/role.component';
import { AuthenticationGuard } from 'src/app/guards/authentication.guard';

const routes: Routes = [
  { path: 'create', component: CreateSetupComponent,canActivate: [AuthenticationGuard] },
  { path: 'shift', component: ShiftComponent,canActivate: [AuthenticationGuard] },
  { path: 'role', component: RoleComponent,canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
