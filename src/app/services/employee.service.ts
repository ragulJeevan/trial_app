import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  getEmployee(url: string) {
    return this.http.get(`${base_url}/${url}`);
  }

  postEmployee(url: string, payLoad: any) {
    return this.http.post(`${base_url}/${url}`, payLoad);
  }

  putEmployee(url: string, payLoad: any) {
    return this.http.put(`${base_url}/${url}`, payLoad);
  }

  deleteEmployee(url: string) {
    return this.http.delete(`${base_url}/${url}`);
  }


}
