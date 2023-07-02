import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  public departmentList : any = [];
  public action = "Mark Attendance";

  constructor(
    private toastr : ToastrService,
  ) { }

  ngOnInit(): void {
 
    this.departmentList = [
      {
        department_name : 'Masion',
        sub_department_count : 4,
        employee_count : 23,
        department_life : true
      },
      {
        department_name : 'Painter',
        sub_department_count : 2,
        employee_count : 16,
        department_life : true
      },
      {
        department_name : 'Electrician',
        sub_department_count : 3,
        employee_count : 21,
        department_life : true
      },
      
    ]
    
  }

  routeAction(){
    this.toastr.warning('Development In progress');
  }

}
