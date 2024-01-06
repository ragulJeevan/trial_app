import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    public title : string = 'Kantha Constrcutions';
    public menu : string = 'MENU';
    public isLoggedIn : boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router : Router,
    private commonService : CommonServiceService,
    ) {}

  ngOnInit() : void {
    let loggedIn : any =localStorage.getItem('usD');
    this.commonService.getLoggIN.subscribe((data:any)=>{
      this.isLoggedIn = data;
    })
    if(loggedIn){
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
  }

  logout(){
    this.isLoggedIn = false;
    // this.commonService.setLoggIn(false);
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  loader(){
    this.commonService.setLoader(true);
    setTimeout(() => {
      this.commonService.setLoader(false);
    }, 3000);
  }

}
