import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSetupComponent } from './create-setup/create-setup.component';
import { ShiftComponent } from './shift/shift.component';

const routes: Routes = [
  { path: 'create', component: CreateSetupComponent },
  { path: 'shift', component: ShiftComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
