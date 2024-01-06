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

  public isAdmin : boolean = false;
  public addButton : string = 'Add Role'

  public roleForm!: FormGroup;
  public roleList: any = [];
  public userDetails: any = [];
  public isAdd: boolean = true;
  public currentRole: any = {};
  public options = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
  ];
  public options1 = [
    { label: 'Active', value: true },
    { label: 'Disable', value: false },
  ];

  public userList: any = [];

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private commonService: CommonServiceService,
    private storageService: LocalstorageService,
  ) { }

  ngOnInit(): void {
    this.commonService.setHeader('Role List');
    this.userDetails = this.storageService.getData('usD');
    this.roleForm = new FormGroup({
      roleName: new FormControl(null, Validators.required),
      isActive: new FormControl(true),
      auth: new FormControl(null, Validators.required),
    });
    this.getRoleList();
    this.getUserList();
  }
  getRoleList() {
    let url = "role/list";
    this.commonService.getData(url).subscribe((res: any) => {
      if (res && res.data) {
        this.roleList = res.data ? res.data : [];
        this.isAdd = true;
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
      this.isAdd = false;
      this.roleForm.patchValue({
        roleName: data.role_name,
        isActive: data.is_Active,
        auth : data?.role_authority
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
      "role_authority":role?.auth,
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
