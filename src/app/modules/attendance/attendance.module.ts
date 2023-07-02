import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { MarkAttendnceComponent } from './mark-attendnce/mark-attendnce.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MarkAttendnceComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule
  ]
})
export class AttendanceModule { }
