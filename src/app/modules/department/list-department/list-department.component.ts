import { LocalizedString } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { DepartmentService } from 'src/app/services/department.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {

  public page_no: number = 1;
  public per_page: number = 10;
  public total!: number;
  public showing_from: number = 1;
  public showing_to: number = 10;
  public departmentList: any = [];
  public search_key: string = '';
  public departmentForm!: FormGroup;
  public saveVariable: boolean = true;
  public isAdd: boolean = true;
  public currentDepartmentDetails: any = {};
  public userDetails: any = [];
  public options = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];
  public userList: any = [];


  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private storageService: LocalstorageService,
    private departmentService: DepartmentService,
    private commonService: CommonServiceService,
  ) { }

  ngOnInit(): void {
    this.userDetails = this.storageService.getData('usD');
    this.departmentForm = new FormGroup({
      depName: new FormControl('', Validators.required),
      isActive: new FormControl('false')
    });
    this.getUserList();
    this.getDepartmentList(1);
  }
  getDepartmentList(Page: any) {
    let url = "department/list";
    this.departmentService.getDep(url).subscribe((res: any) => {
      if (res) {
        this.departmentList = res.data ? res.data : [];
        this.isAdd = true;
        // this.toastr.success(res.statusMessage);
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err.error && err.error.errorMessage) {
        this.toastr.error(err.error.errorMessage)
      }

    }))
  }
  cancel() {

  }
  setItemsPerPage(event: any) {

  }
  openDepartmentModal(modal: any, type: string, data: any) {
    if (type == 'edit') {
      this.isAdd = false
      this.currentDepartmentDetails = data;
      this.departmentForm.patchValue({
        depName: data.department_name,
        isActive: data.is_Active
      });
    }
    this.modalService.open(modal, {
      size: 'md',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
  }

  addDepartment() {
    if (this.departmentForm.invalid) {
      this.toastr.error('Please Fill All The Required Fields');
      return;
    }
    let department = this.departmentForm.value;
    let currentDate = moment(new Date()).format('DD MM YYYY hh:mm:ss');
    let url = 'department/add';
    let payLoad = {
      "department_name": department.depName,
      "client_id": this.userDetails.client_id,
      "created_by": this.userDetails._id,
      "created_at": currentDate,
      "is_Active": department.isActive
    };
    this.departmentService.postDep(url, payLoad).subscribe((res: any) => {
      if (res && res.data) {
        this.getDepartmentList(1);
        this.close();
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err.error && err.error.errorMessage) {
        this.toastr.error(err.error.errorMessage)
      }
    }))
  }
  updateDepartment() {
    if (this.departmentForm.invalid) {
      this.toastr.error('Please Fill All The Required Fields');
      return;
    }
    let department = this.departmentForm.value;
    let currentDate = moment(new Date()).format('DD MM YYYY hh:mm:ss');
    let url = `department/edit/${this.currentDepartmentDetails._id}`;
    let payLoad = {
      "department_name": department.depName,
      "client_id": this.userDetails.client_id,
      "update_by": this.userDetails._id,
      "updated_at": currentDate,
      "is_Active": department.isActive
    };
    this.departmentService.putDep(url, payLoad).subscribe((res: any) => {
      if (res && res.data) {
        this.getDepartmentList(1);
        this.close();
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err.error && err.error.errorMessage) {
        this.toastr.error(err.error.errorMessage)
      }
    }))
  }
  close() {
    this.departmentForm.reset();
    this.modalService.dismissAll();
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
