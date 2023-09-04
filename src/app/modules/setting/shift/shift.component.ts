import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { end } from '@popperjs/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';


@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {

  public shiftForm!: FormGroup;
  public shiftList: any = [];
  public userDetails: any = [];
  public isAddShift: boolean = true;

  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private commonService: CommonServiceService,
    private storageService: LocalstorageService,
  ) { }

  ngOnInit(): void {
    this.userDetails = this.storageService.getData('usD');
    this.shiftForm = new FormGroup({
      shiftName: new FormControl(null, Validators.required),
      timeZone: new FormControl('IST'),
      startTime: new FormControl(null, Validators.required),
      endTime: new FormControl(null, Validators.required)
    });
    this.getShiftList();
  }

  // TO OPEN SHIFT MODAL 
  openShiftModal(modal: any, type: string, data: any) {
    if (type == 'Edit') {
      this.isAddShift = false;
      this.shiftForm.patchValue({
        shiftName: data.shift_name,
        timeZone: 'IST',
        startTime: moment(data.start_time, 'hh:mm a').format('HH:mm'),
        endTime: moment(data.end_time, 'hh:mm a').format('HH:mm'),
      })
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
    this.shiftForm.reset();
    this.modalService.dismissAll();
  }
  // TO GET SHIFT 
  getShiftList() {
    let url = "shift/list";
    this.commonService.getData(url).subscribe((res: any) => {
      if (res && res.data) {
        this.shiftList = res.data ? res.data : [];
      }
    }, ((err: any) => {
      console.log(err.error);
      if (err.error && err.error.errorMessage) {
        this.toastr.error(err.error.erroMessage);
      }
    }))

  }
  // TO ADD SHIFT 
  addShift() {
    let shift = this.shiftForm.value;
    // DD MM YYYY hh:mm:ss
    let currentDate = moment(new Date()).format('DD MM YYYY hh:mm:ss');
    if (this.shiftForm.invalid) {
      this.toastr.error("Please Fill Mandatory Fields");
      return;
    };
    let startTime = moment(shift.startTime, 'hh:mm:ss');
    let endTime = moment(shift.endTime, 'hh:mm:ss');
    let duration = moment.duration(endTime.diff(startTime));
    let hours = duration.hours();

    let url = "shift/add";
    let payLoad = {
      "shift_name": shift.shiftName,
      "client_id": this.userDetails.client_id,
      "duration": hours,
      "time_zone": "IST",
      "start_time": moment(startTime).format('hh:mm a'),
      "end_time": moment(endTime).format('hh:mm a'),
      "created_by": this.userDetails._id,
      "created_at": currentDate
    }
    this.commonService.postData(url, payLoad).subscribe((res: any) => {
      if (res) {
        this.toastr.success(res.message);
        this.getShiftList();
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
