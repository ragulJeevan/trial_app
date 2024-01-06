import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkAttendnceComponent } from './mark-attendnce/mark-attendnce.component';
import { AuthenticationGuard } from 'src/app/guards/authentication.guard';

const routes: Routes = [
  { path: 'mark-attendance', component: MarkAttendnceComponent,canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
