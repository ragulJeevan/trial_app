import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  private _logged$ = new BehaviorSubject<boolean>(false);

  constructor() { }

// AFTER LOGGING IN 
setLoggIn(data: any) { if (data) { this._logged$.next(data); } }
get getLoggIN() { return this._logged$.asObservable(); }


}
