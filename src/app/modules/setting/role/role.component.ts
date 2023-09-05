import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public roleForm!: FormGroup;
  public roleList: any = [];
  public userDetails: any = [];
  public isAddRole: boolean = true;
  public currentRole: any = {};
  public options = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ]

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private commonService: CommonServiceService,
    private storageService: LocalstorageService,
  ) { }

  ngOnInit(): void {
    this.userDetails = this.storageService.getData('usD');
    this.roleForm = new FormGroup({
      roleName: new FormControl(null, Validators.required),
      isActive: new FormControl(false),
    });
    this.getRoleList();
  }
  getRoleList() {
    let url = "role/list";
    this.commonService.getData(url).subscribe((res: any) => {
      if (res && res.data) {
        this.roleList = res.data ? res.data : [];
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err.error && err.error.errorMessage) {
        this.toastr.error(err.error.erroMessage);
      }
    }))

  }
  // TO OPEN SHIFT MODAL 
  openRoleModal(modal: any, type: string, data: any) {
    if (type == 'Edit') {
      this.isAddRole = false;
      this.roleForm.patchValue({
        roleName: data.role_name,
        isActive: data.is_Active
      });
      this.currentRole = data;
    }
    this.modalService.open(modal, {
      size: 'md',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
  }
  // CLOSE MODAL 
  close() {
    this.roleForm.reset();
    this.modalService.dismissAll();
  }
  // TO ADD SHIFT 
  addRole() {
    let role = this.roleForm.value;
    let currentDate = moment(new Date()).format('DD MM YYYY hh:mm:ss');
    if (this.roleForm.invalid) {
      this.toastr.error("Please Fill Mandatory Fields");
      return;
    };
    let url = "role/add";
    let payLoad = {
      "role_name": role.roleName,
      "is_Active": role.isActive,
      "client_id": this.userDetails.client_id,
      "created_by": this.userDetails._id,
      "created_at": currentDate
    }
    this.commonService.postData(url, payLoad).subscribe((res: any) => {
      if (res) {
        this.toastr.success(res.message);
        this.getRoleList();
        this.close();
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err.error && err.error.errorMessage) {
        this.toastr.error(err.error.errorMessage);
      }

    }))
  }
  updateRole() {
    let role = this.roleForm.value;
    let currentDate = moment(new Date()).format('DD MM YYYY hh:mm:ss');
    if (this.roleForm.invalid) {
      this.toastr.error("Please Fill Mandatory Fields");
      return;
    };

    let url = `role/edit/${this.currentRole._id}`;
    let payLoad = {
      "role_name": role.roleName,
      "is_Active": role.isActive,
      "client_id": this.userDetails.client_id,
      "updated_by": this.userDetails._id,
      "updated_at": currentDate
    }
    this.commonService.putData(url, payLoad).subscribe((res: any) => {
      if (res) {
        this.toastr.success(res.message);
        this.getRoleList();
        this.close();
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err.error && err.error.errorMessage) {
        this.toastr.error(err.error.errorMessage);
      }

    }))
  }
}
