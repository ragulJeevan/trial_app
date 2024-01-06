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
  private _loader$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) { }

  // LOADER 
  setLoader(data: any) {
    this._loader$.next(data);
  }
  get getLoader() {
    return this._loader$.asObservable();
  }

  // AFTER LOGGING IN 
  setLoggIn(data: any) { if (data) { this._logged$.next(data); } }
  get getLoggIN() { return this._logged$.asObservable(); }

  getData(url: string) {
    return this.http.get(`${base_url}/${url}`);
  }

  postData(url: string, payLoad: any) {
    return this.http.post(`${base_url}/${url}`, payLoad);
  }

  putData(url: string, payLoad: any) {
    return this.http.put(`${base_url}/${url}`, payLoad);
  }

  deleteData(url: string) {
    return this.http.delete(`${base_url}/${url}`);
  }


  logIn(url: string, payLoad: any) {
    return this.http.post(`${base_url}/${url}`, payLoad);
  }

  logOut() {

  }


}
