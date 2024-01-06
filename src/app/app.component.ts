import { Component,OnInit } from '@angular/core';
import { CommonServiceService } from './services/common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'Modular-X';

  public isLoader : boolean = false;

  constructor(
    private commonService : CommonServiceService,
  ){

  }

  ngOnInit() : void {
    this.commonService.getLoader.subscribe((loader:any)=>{
      this.isLoader = loader
    })
  }

}
