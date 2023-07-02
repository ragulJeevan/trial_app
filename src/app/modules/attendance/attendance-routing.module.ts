import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkAttendnceComponent } from './mark-attendnce/mark-attendnce.component';

const routes: Routes = [
  {path:'mark-attendance',component:MarkAttendnceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
