import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userDetails: any;
  public loggedIn: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private commonService: CommonServiceService,
    private storageService: LocalstorageService,
  ) { }

  ngOnInit(): void {
    // this.getLogin();
    this.commonService.getLoggIN.subscribe((x: any) => {
      if (x) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    })
  }
  logout() {
    this.storageService.clearStorage();
    this.commonService.setLoggIn(false);
    this.loggedIn = false;
  }
  gotoLink(link: string) {
    if (link == '') {
      this.toastr.warning('Development In Process');
      return;
    }
    this.router.navigate([link]);
  }
  // getLogin() {
  //   this.userDetails = this.storageService.getData('usD');
  //   if (this.userDetails && this.userDetails != null) {
  //     this.loggedIn = true;
  //   } else {
  //     this.loggedIn = false;
  //   }
  // }

}
