import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular'; 
import { HelperService } from './helper.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private helper: HelperService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip if header contains "skip"
    if (req.headers.get('skip')) {
      return next.handle(req);
    }

    
    const storeService = this.injector.get(Storage);
    const tokenPromise = this.helper.getToken(); 

    return from(tokenPromise).pipe(
      switchMap((token: any) => {
        
        let tokenString = token.toString();
        //console.log(tokenString);
        
        
        if (Object.keys(tokenString).length > 0) {
          tokenString = tokenString.replace(/"/g, '');
          localStorage.setItem("userToken",tokenString)
        }

        
        const request = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenString}`
          }
        });

        return next.handle(request);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}
