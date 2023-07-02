import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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
 public search_key:string ='';
 public departmentForm!:FormGroup;
 public saveVariable : boolean = true;
 

  constructor(
    private modalService : NgbModal,
    private tostr : ToastrService,
  ) { }

  ngOnInit(): void {

    this.departmentForm = new FormGroup({
      depName: new FormControl('', Validators.required),
      depID : new FormControl('')
    });

   this.departmentList = [];
  }
  getDepartmentList(Page:any){

  }
  cancel(){

  }
  setItemsPerPage(event:any){

  }
  openDepartmentModal(modal: any) {
    this.modalService.open(modal, {
      size: 'md',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
  }

  addDepartment(){
    if(this.departmentForm.invalid){
      this.tostr.error('Please Fill All The Required Fields');
      return;
    }
    let department = this.departmentForm.value;
    console.log(department);
    this.tostr.success('Department Added Successsfully');
    this.close();
    
  }
  close() {
    this.departmentForm.reset();
    this.modalService.dismissAll();
  }

  

}
