import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  logout() {

  }
  gotoLink(link: string) {
    if (link == '') {
      this.toastr.warning('Development In Process');
      return;
    }
    this.router.navigate([link]);
  }

}
