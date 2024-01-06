import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css']
})
export class SiteListComponent implements OnInit {

  public siteList : any = [];
  public add = "Add Site";

  constructor(
    private toastr : ToastrService,
  ) { }

  ngOnInit(): void {

    this.siteList = [
      {
        site_name : 'Babu Nagar',
        department_count : 4,
        employee_count : 23,
        site_life : true
      },
      {
        site_name : 'Nawin Nagar',
        department_count : 0,
        employee_count : 0,
        site_life : true
      },
      {
        site_name : 'Rajan Nagar',
        department_count : 1,
        employee_count : 6,
        site_life : true
      },
      {
        site_name : 'Selvam Nagar',
        department_count : 0,
        employee_count : 0,
        site_life : false
      },
    ]

  }

  routeAction(){
    this.toastr.warning('Development In progress');
  }

}
