import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public page_no: number = 1;
  public per_page: number = 10;
  public total!: number;
  public showing_from: number = 1;
  public showing_to: number = 10;
  public userList: any = [];
  public search_key: string = '';
  public userForm!: FormGroup;
  public saveVariable: boolean = true;
  public departmentList: any = [];
  public subDepartmentList: any = [];
  public teamList: any = [];
  public currentUser: any;
  public roleList: any = [];
  public validateUser: string = '';

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private storageService: LocalstorageService,
    private commonService: CommonServiceService,
  ) { }

  ngOnInit(): void {

    this.currentUser = this.storageService.getData('usD');

    this.userForm = new FormGroup({
      user_name: new FormControl('', Validators.required),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      mobile: new FormControl(''),
      pass_code: new FormControl('', Validators.required),
      role_id: new FormControl('', Validators.required),
      dep_id: new FormControl('', Validators.required),
      sub_dep_id: new FormControl(''),
    });

    this.getRoleList();
    this.getDepartmentList();
    this.getUserList(1);
  }

  getUserList(Page: number) {
    let url = "users/list";
    this.employeeService.getEmployee(url).subscribe((res: any) => {
      console.log(res);
      if (res.data) {
        this.userList = res.data;
      }

    }, ((err: any) => {
      console.log(err.error);
      if (err && err.error) {
        this.toastr.error(err.error.errorMessage);
      }

    }))


  }
  cancel() {

  }
  setItemsPerPage(event: any) {

  }
  openUserModal(modal: any, item: string, data: any) {
    this.validateUser = item;
    if (item === 'Edit') {
      this.userForm.patchValue({
        user_name: data?.user_name ? data?.user_name : '',
        first_name: data?.first_name ? data?.first_name : '',
        last_name: data?.last_name ? data?.last_name : '',
        mobile: data?.mobile ? data?.mobile : '',
        pass_code: data?.password ? data?.password : '',
        role_id: data?.role_id ? data?.role_id : '',
        dep_id: data?.dep_id ? data?.dep_id : '',
        sub_dep_id: data?.sub_dep_id ? data?.sub_dep_id : '',
      });
    }
    this.modalService.open(modal, {
      size: 'md',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
  }

  // TO ADD USER 
  addUser() {
    if (this.userForm.invalid) {
      this.toastr.error('Please Fill all the required Fields');
      return;
    }
    let url = 'users/add';
    let userData = this.userForm.value;
    let currentDate = moment(new Date()).format('DD MM YYYY hh:mm:ss');

    let payLoad = {
      "user_name": userData.user_name,
      "first_name": userData.first_name,
      "last_name": userData.last_name,
      "password": userData.pass_code,
      "client_id": this.currentUser.client_id,
      "client_name": this.currentUser.client_name,
      "dep_id": userData.dep_id,
      "role_id": userData.role_id,
      "created_by": this.currentUser._id,
      "created_at": currentDate
    };


    this.employeeService.postEmployee(url, payLoad).subscribe((res: any) => {
      if (res.data) {
        this.toastr.success(res.statusMessage);
        this.getUserList(1);
        this.close();
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err && err.error) {
        this.toastr.error(err.error.errorMessage);
      }

    }));

  }
  // TO UPDATE USER 
  updateUser() {

    if (this.userForm.invalid) {
      this.toastr.error('Please Fill all the required Fields');
      return;
    }
    let userData = this.userForm.value;
    let newData = userData;
    let url = `users/edit/${this.currentUser._id}`;
    let currentDate = moment(new Date()).format('DD MM YYYY hh:mm:ss');

    let payLoad = {
      "user_name": userData.user_name,
      "first_name": userData.first_name,
      "last_name": userData.last_name,
      "password": userData.password,
      "client_id": this.currentUser.client_id,
      "client_name": this.currentUser.client_name,
      "dep_id": userData.dep_id,
      "role_id": userData.role_id
    };


    this.employeeService.putEmployee(url, payLoad).subscribe((res: any) => {
      if (res.data) {
        this.toastr.success(res.statusMessage);
        this.getUserList(1);
        this.close();
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err && err.error) {
        this.toastr.error(err.error.errorMessage);
      }

    }));

  }
  close() {
    this.restForm();
    this.modalService.dismissAll();
  }
  // RESET FORM 
  restForm() {
    this.userForm.reset();
    this.validateUser = '';
  }

  // TO GET DEPARTMENT 
  getDepartmentList() {
    let url = 'department/list';
    this.departmentService.getDep(url).subscribe((res: any) => {
      if (res.data) {
        this.departmentList = res?.data ? res?.data : [];
      }
    },
      ((err: any) => {
        console.log(err.error);
        if (err && err.error) {
          this.toastr.error(err.error.errorMessage);
        }

      }))
  }
  // TO GET MAPPED DEPARTMENT 
  getDep(item: any) {
    if (item && item != "") {
      let dep = this.departmentList.find((x: any) => x._id == item);
      return dep?.department_name ? dep.department_name : ""
    } else {
      return "";
    }

  }
  // TO GET ROLE
  getRoleList() {
    let url = 'role/list';
    this.departmentService.getDep(url).subscribe((res: any) => {
      if (res.data) {
        this.roleList = res?.data ? res?.data : [];
      }
    },
      ((err: any) => {
        console.log(err.error);
        if (err && err.error) {
          this.toastr.error(err.error.errorMessage);
        }

      }))
  }

  // TO GET MAPPED Role 
  getRole(item: any) {
    if (item && item != "") {
      let role = this.roleList.find((x: any) => x._id == item);
      return role?.role_name ? role?.role_name : ""
    } else {
      return "";
    }

  }
  // TO GET MAPPED USER 
  getUser(item: any) {
    if (item && item != "") {
      let user = this.userList.find((x: any) => x._id == item);
      return user?.user_name ? user?.user_name : "";
    } else {
      return "";
    }

  }

}
