import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(private router: Router) { }

  postData(setName: string, data: any) {
    let encodedata: any = btoa(JSON.stringify(data));
    localStorage.setItem(`${setName}`, encodedata);
  }

  getData(getName: string) {
    let storedData: any = localStorage.getItem(`${getName}`);
    let data = atob(storedData);
    let decodedData: any = (JSON.parse(data));
    return decodedData;
  }
  clearStorage() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
