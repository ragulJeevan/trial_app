import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

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
  public validateUser: string = '';
  public updatedData: any;
  public currentUser: any;
  public roleList: any = [];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
  ) { }

  ngOnInit(): void {

    let data: any = localStorage.getItem('userDetails');
    this.currentUser = JSON.parse(data);
    this.employeeForm = new FormGroup({
      emp_name: new FormControl('', Validators.required),
      dep_id: new FormControl('', Validators.required),
      role_id: new FormControl('', Validators.required),
      sub_dep_id: new FormControl(''),
    });


    this.getRoleList();
    this.getDepartmentList();
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
    this.validateUser = item;
    this.updatedData = data;
    if (item == 'Edit') {
      this.employeeForm.patchValue({
        emp_name: data?.emp_name ? data?.emp_name : '',
        dep_id: data?.dep_id ? data?.dep_id : '',
        role_id: data?.role_id ? data?.role_id : '',
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

  addEmployee() {
    if (this.employeeForm.invalid) {
      this.toastr.error('Please Fill All The Required Fields');
      return;
    }
    let dep = this.employeeForm.value;
    let url = 'emp/add'
    let payLoad = {
      "emp_name": dep.emp_name,
      "client_id": this.currentUser.client_id,
      "client_name": this.currentUser.client_name,
      "dep_id": dep.dep_id,
      "sub_dep_id": dep.sub_dep_id,
      "role_id": dep.role_id

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

    let payLoad = {
      "emp_name": dep.emp_name,
      "client_id": this.currentUser.client_id,
      "client_name": this.currentUser.client_name,
      "dep_id": dep.dep_id,
      "sub_dep_id": dep.sub_dep_id,
      "role_id": dep.role_id
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

}
