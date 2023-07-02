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
  public isLoggedIn : boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr : ToastrService,
    private router : Router,
    private commonService : CommonServiceService,
    ) { }

  ngOnInit(): void {

    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
    this.loginForm = new FormGroup({
      user_name : new FormControl('',Validators.required),
      pass_code : new FormControl ('',Validators.required)
    })
  }


  submitForm() {
    let userDetails = this.loginForm.value;
   if(!this.isLoggedIn && this.loginForm.invalid){
    this.toastr.error('Enter Required Fields');
    return;
   };
   if(
    // this.loginForm.controls['user_name'].value == '8248399209' || this.loginForm.controls['user_name'].value == '9159876526'|| this.loginForm.controls['passCode'].value == 'ragul' || this.loginForm.controls['passCode'].value == 'ragul'
    environment.passCode.includes(userDetails.pass_code) && environment.userName.includes(userDetails.user_name)
   ){
    localStorage.setItem('login',JSON.stringify(this.loginForm.value));
    localStorage.setItem('logged','loggedIn');
    console.log(this.loginForm.value);
    this.loginForm.reset();
    this.commonService.setLoggIn(true);
    this.router.navigate(['attendance/mark-attendance']); 
   }else{
    this.toastr.error('Username and Password not found');
   }
   
  }

}
