import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public isLoggedIn: boolean = false;
  public loggedInUser: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private commonService: CommonServiceService,
    private storageService: LocalstorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      user_name: new FormControl('', Validators.required),
      pass_code: new FormControl('', Validators.required)
    })
  }


  submitForm() {
    let url = 'users/login';
    let userDetails = this.loginForm.value;
    if (!this.isLoggedIn && this.loginForm.invalid) {
      this.toastr.error('Enter Required Fields');
      return;
    };
    let payLoad = {
      user_name: userDetails.user_name,
      password: userDetails.pass_code
    }
    this.commonService.logIn(url, payLoad).subscribe((res: any) => {
      if (res.data) {
        this.loggedInUser = res.data ? res.data : [];
        if (this.loggedInUser && this.loggedInUser.length > 0) {
          this.storageService.postData('usD', this.loggedInUser[0]);
          if (this.loggedInUser[0].role_id == '64f4a0a207c44fa32886c541') {
            this.router.navigate(['sites/list-site']);
          } else {
            this.router.navigate(['attendance/mark-attendance']);
          }
        }
        this.commonService.setLoggIn(true);
      }
    },
      ((err: any) => {
        console.log(err);
        if (err && err.error) {
          this.toastr.error(err.error.errorMessage);
        }

      }))

  }



}
