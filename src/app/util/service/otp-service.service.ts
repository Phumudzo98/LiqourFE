import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Auth } from './Auth';
import { headers } from './const';

@Injectable({
  providedIn: 'root'
})
export class OtpServiceService {

  private apiUrl = "/api/auth";
    constructor(private httpClient: HttpClient, private auth: Auth) { }

    
    public getOneTimePin(auth:Auth): Observable<any> {
      
        return this.httpClient.post<any>(`${this.apiUrl}/get-otp`,auth,{ headers: headers }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        )
    }

    public validateOTP(auth:Auth): Observable<any> {
        return this.httpClient.post<any>(`${this.apiUrl}/validate-otp`,auth,{ headers: headers }).pipe(
            catchError((error) => {
                return throwError(() => error);
            })
        )
    }
}
