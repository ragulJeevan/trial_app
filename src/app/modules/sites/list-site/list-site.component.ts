import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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
  public search_key:string ='';
  public siteForm!:FormGroup;
  public saveVariable : boolean = true;

  constructor(
    private modalService : NgbModal,
    private tostr : ToastrService,
  
  ) { }

  ngOnInit(): void {

    this.siteForm = new FormGroup({
      siteName: new FormControl('', Validators.required),
      siteID : new FormControl(''),

    });

    this.siteList=[];
  }

  getsiteList(Page:any){

  }
  cancel(){

  }
  setItemsPerPage(event:any){

  }

  openSiteModal(modal: any) {
    this.modalService.open(modal, {
      size: 'md',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      keyboard: false
    });
  }

  addSite(){
    if(this.siteForm.invalid){
      this.tostr.error('Please Fill All The Required Fields');
      return;
    }
    let department = this.siteForm.value;
    console.log(department);
    this.tostr.success('Department Added Successsfully');
    this.close();
    
  }
  
  close() {
    this.siteForm.reset();
    this.modalService.dismissAll();
  }


}
