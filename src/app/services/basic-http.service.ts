import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BasicHttpService implements HttpInterceptor {

  public token: any = 'Initial';

  constructor() {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    req = req.clone({
      setHeaders: {
        Authorization: 'Modular-X',
        Accept : 'All'
      }
    });
    return next.handle(req)
      .pipe(
        retry(0),
      )
  }
}
