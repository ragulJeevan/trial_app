import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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
  public search_key:string ='';
  public employeeForm!:FormGroup;
  public saveVariable : boolean = true;
  public departmentList :any=[];
  public subDepartmentList:any=[];
  public teamList : any =[];

  constructor(
    private modalService : NgbModal,
    private tostr : ToastrService,
  ) { }

  ngOnInit(): void {


    this.employeeForm = new FormGroup({
        empName: new FormControl('', Validators.required),
        empID : new FormControl(''),
        department: new FormControl('', Validators.required),
        subDepartment: new FormControl('', Validators.required),
        // team: new FormControl('', Validators.required),
      });
  

    this.employeeList =[];
  }

  getEmployeeList(Page:number){

  }
  cancel(){

  }
  setItemsPerPage(event:any){

  }
  openEmployeeModal(modal: any) {
    this.modalService.open(modal, {
      size: 'md',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
  }

  addEmployee(){
    if(this.employeeForm.invalid){
      this.tostr.error('Please Fill All The Required Fields');
      return;
    }
    let department = this.employeeForm.value;
    console.log(department);
    this.tostr.success('Department Added Successsfully');
    this.close();
    
  }
  
  close() {
    this.employeeForm.reset();
    this.modalService.dismissAll();
  }

}
