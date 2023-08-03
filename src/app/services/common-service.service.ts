import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  private _logged$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) { }

  // AFTER LOGGING IN 
  setLoggIn(data: any) { if (data) { this._logged$.next(data); } }
  get getLoggIN() { return this._logged$.asObservable(); }

  logIn(url: string, payLoad: any) {
    return this.http.post(`${base_url}/${url}`, payLoad);
  }

  logOut() {

  }


}
