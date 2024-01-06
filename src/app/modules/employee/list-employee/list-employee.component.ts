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
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  public isAdmin : boolean = false;
  public addButton : string = 'Add Employee'

  public page_no: number = 1;
  public per_page: number = 10;
  public total!: number;
  public showing_from: number = 1;
  public showing_to: number = 10;
  public employeeList: any = [];
  public search_key: string = '';
  public employeeForm!: FormGroup;
  public saveVariable: boolean = true;
  public departmentList: any = [];
  public subDepartmentList: any = [];
  public updatedData: any;
  public roleList: any = [];
  public userDetails: any = [];
  public options = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];
  public isAdd: boolean = true;
  public userList: any = [];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    public storageService: LocalstorageService,
    private commonService: CommonServiceService,
  ) { }

  ngOnInit(): void {
    this.commonService.setHeader('Employee List');
    this.userDetails = this.storageService.getData('usD');
    this.employeeForm = new FormGroup({
      emp_name: new FormControl('', Validators.required),
      wage : new FormControl('', Validators.required),
      dep_id: new FormControl('', Validators.required),
      role_id: new FormControl('', Validators.required),
      isActive: new FormControl(true),
    });
    this.getRoleList();
    this.getDepartmentList();
    this.getUserList();
    this.getEmployeeList(1);
  }

  getEmployeeList(Page: number) {
    let url = "emp/list";
    this.employeeService.getEmployee(url).subscribe((res: any) => {
      console.log(res);
      if (res.data) {
        this.employeeList = res.data;
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
  openDeleteModal(modal: any, data: any) {
    this.updatedData = data;
    this.modalService.open(modal, {
      size: 'md',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
  }
  // TO DELETE EMPLOYEE 
  deleteEmployee() {
    let data = this.updatedData;
    let url = `emp/delete/${data._id}`;
    this.employeeService.deleteEmployee(url).subscribe((res: any) => {
      if (res.data) {
        this.toastr.success(res.statusMessage);
        this.getEmployeeList(1);
        this.close();
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err && err.error) {
        this.toastr.error(err.error.errorMessage)
      }

    }))
  }
  openEmployeeModal(modal: any, item: string, data: any) {
    this.updatedData = data;
    if (item == 'Edit') {
      this.employeeForm.patchValue({
        emp_name: data?.emp_name ? data?.emp_name : '',
        wage : data?.wage,
        dep_id: data?.dep_id ? data?.dep_id : '',
        role_id: data?.role_id ? data?.role_id : '',
        // sub_dep_id: data?.sub_dep_id ? data?.sub_dep_id : '',
        isActive: data.is_Active
      });
      this.isAdd = false;
    }
    this.modalService.open(modal, {
      size: 'md',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
  }

  addEmployee() {
    if (this.employeeForm.invalid) {
      this.toastr.error('Please Fill All The Required Fields');
      return;
    }
    let dep = this.employeeForm.value;
    let url = 'emp/add';
    let currentDate = moment(new Date()).format('DD MM YYYY hh:mm:ss');
    let payLoad = {
      "emp_name": dep.emp_name,
      "client_id": this.userDetails.client_id,
      "wage":  dep.wage,
      "dep_id": dep.dep_id,
      "role_id": dep.role_id,
      "is_Active": dep.isActive,
      "created_by": this.userDetails._id,
      "created_at": currentDate

    }
    this.employeeService.postEmployee(url, payLoad).subscribe((res: any) => {
      if (res.data) {
        this.toastr.success(res.statusMessage);
        this.getEmployeeList(1);
        this.close();
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err && err.error) {
        this.toastr.error(err.error.errorMessage);
      }

    }));
  }

  updateEmployee() {

    if (this.employeeForm.invalid) {
      this.toastr.error('Please Fill all the required Fields');
      return;
    }
    let dep = this.employeeForm.value;
    let newData = this.updatedData;
    let url = `emp/edit/${newData._id}`;
    let currentDate = moment(new Date()).format('DD MM YYYY hh:mm:ss');

    let payLoad = {
      "emp_name": dep.emp_name,
      "client_id": this.userDetails.client_id,
      "wage":  dep.wage,
      "dep_id": dep.dep_id,
      // "sub_dep_id": dep.sub_dep_id,
      "role_id": dep.role_id,
      "is_Active": dep.isActive,
      "updated_by": this.userDetails._id,
      "updated_at": currentDate
    };


    this.employeeService.putEmployee(url, payLoad).subscribe((res: any) => {
      if (res.data) {
        this.toastr.success(res.statusMessage);
        this.getEmployeeList(1);
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
    this.isAdd = true;
    this.modalService.dismissAll();
  }

  restForm() {
    this.employeeForm.reset();
    this.updatedData = [];
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
  // TO GET USER DETAILS 
  getUserList() {
    let url = 'users/list';
    this.commonService.getData(url).subscribe((res: any) => {
      if (res.data) {
        this.userList = res?.data ? res?.data : [];
      }
    },
      ((err: any) => {
        console.log(err.error);
        if (err && err.error) {
          this.toastr.error(err.error.errorMessage);
        }

      }))
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
