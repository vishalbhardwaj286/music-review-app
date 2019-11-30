import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(!req.url.match('/public')) {
      return this.auth.getTokenSilently$().pipe(
        mergeMap(token => {
          if(!req.url.match('/public'))
          {
            const tokenReq = req.clone({
              setHeaders: { Authorization: `Bearer ${token}` }
            });
            return next.handle(tokenReq);
          }
          // console.log(`Intercepting all public requests ${req.url}`);
          return next.handle(null);
        }),
        catchError(err => throwError(err))
    )}
    else{
      const tokenReq = req.clone({
        setHeaders: {}
      });
      return next.handle(tokenReq);
    }
  }
}