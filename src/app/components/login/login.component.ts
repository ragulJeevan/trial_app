import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public isLoggedIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private commonService: CommonServiceService,
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
        localStorage.setItem('userDetails', JSON.stringify(res.data[0]));
        localStorage.setItem('logged', 'loggedIn');
        this.commonService.setLoggIn(true);
        this.router.navigate(['attendance/mark-attendance']);
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
