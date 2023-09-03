import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private storageService: LocalstorageService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // let loggedInDetails: any = localStorage.getItem('logged');
    let loggedInDetails: any = this.storageService.getData('usD');
    if (
      loggedInDetails && loggedInDetails != null
    ) {
      this.router.navigate(['sites/list-site']);
    } else {
      this.router.navigate(['/login']);
    }
    return true;
  }

}
