import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-list-site',
  templateUrl: './list-site.component.html',
  styleUrls: ['./list-site.component.css']
})
export class ListSiteComponent implements OnInit {

  public page_no: number = 1;
  public per_page: number = 10;
  public total!: number;
  public showing_from: number = 1;
  public showing_to: number = 10;
  public siteList: any = [];
  public search_key: string = '';
  public siteForm!: FormGroup;
  public saveVariable: boolean = true;
  public userList: any = [];
  public currentSite: any = {};
  public options = [
    { label: 'Active', value: true },
    { label: 'Inactive', value: false }
  ];
  public userDetails: any = [];
  public isAdd: boolean = true;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private commonService: CommonServiceService,
    private storageService: LocalstorageService,

  ) { }

  ngOnInit(): void {
    this.userDetails = this.storageService.getData('usD');
    this.siteForm = new FormGroup({
      siteName: new FormControl('', Validators.required),
      siteAddress: new FormControl(''),
      isActive: new FormControl(false)
    });
    this.getSiteList(1);
    this.getUserList();
  }

  getSiteList(Page: any) {
    let url = "sites/list";
    this.commonService.getData(url).subscribe((res: any) => {
      if (res && res.data) {
        this.siteList = res.data ? res.data : [];
        this.isAdd = true;
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err.error && err.error.errorMessage) {
        this.toastr.error(err.error.erroMessage);
      }
    }))
  }
  cancel() {

  }
  setItemsPerPage(event: any) {

  }

  openSiteModal(modal: any, type: string, data: any) {
    this.currentSite = data;
    if (type == 'Edit') {
      this.isAdd = false;
      this.siteForm.patchValue({
        siteName: data.site_name,
        siteAddress: data.address,
        isActive: data.is_Active
      })
    }
    this.modalService.open(modal, {
      size: 'md',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
  }

  addSite() {
    if (this.siteForm.invalid) {
      this.toastr.error('Please Fill All The Required Fields');
      return;
    }
    let site = this.siteForm.value;
    let currentDate = moment(new Date()).format('DD MM YYYY hh:mm:ss');
    if (this.siteForm.invalid) {
      this.toastr.error("Please Fill Mandatory Fields");
      return;
    };

    let url = `sites/add`;
    let payLoad = {
      "site_name": site.siteName,
      "is_Active": site.isActive,
      "client_id": this.userDetails.client_id,
      "created_by": this.userDetails._id,
      "created_at": currentDate
    }
    this.commonService.postData(url, payLoad).subscribe((res: any) => {
      if (res) {
        this.toastr.success(res.message);
        this.getSiteList(1);
        this.close();
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err.error && err.error.errorMessage) {
        this.toastr.error(err.error.errorMessage);
      }
    }))

  }
  updateSite() {
    let site = this.siteForm.value;
    let currentDate = moment(new Date()).format('DD MM YYYY hh:mm:ss');
    if (this.siteForm.invalid) {
      this.toastr.error("Please Fill Mandatory Fields");
      return;
    };

    let url = `role/edit/${this.currentSite._id}`;
    let payLoad = {
      "site_name": site.siteName,
      "is_Active": site.isActive,
      "client_id": this.userDetails.client_id,
      "updated_by": this.userDetails._id,
      "updated_at": currentDate
    }
    this.commonService.putData(url, payLoad).subscribe((res: any) => {
      if (res) {
        this.toastr.success(res.statusMessage);
        this.getSiteList(1);
        this.close();
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err.error && err.error.errorMessage) {
        this.toastr.error(err.error.errorMessage);
      }
    }))
  }
  close() {
    this.siteForm.reset();
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
