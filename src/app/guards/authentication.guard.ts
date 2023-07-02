import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let loggedInDetails:any = localStorage.getItem('logged');
    if(
      loggedInDetails && loggedInDetails != null
    ){
      this.router.navigate(['attendance/mark-attendance']);
    }else{
      this.router.navigate(['/login']);
    }
    return true;
  }
  
}
