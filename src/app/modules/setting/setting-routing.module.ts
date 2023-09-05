import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSetupComponent } from './create-setup/create-setup.component';
import { ShiftComponent } from './shift/shift.component';
import { RoleComponent } from './role/role.component';

const routes: Routes = [
  { path: 'create', component: CreateSetupComponent },
  { path: 'shift', component: ShiftComponent },
  { path: 'role', component: RoleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
