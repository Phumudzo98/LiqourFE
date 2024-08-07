import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Auth } from './Auth';
import { headers } from './const';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OtpServiceService {

  private apiUrl = "/api/auth";
  constructor(private httpClient: HttpClient, private auth: Auth) { }

  public getOneTimePin(auth2: any): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8081/api/auth/get-otp", auth2, { headers: headers }).pipe(
      catchError((error) => {
        console.error('Error occurred while getting OTP:', JSON.stringify(error)); 
        return throwError(() => error);
      })
    );
  }

  public validateOTP(auth2:any): Observable<any> {
    return this.httpClient.post<any>("http://localhost:8081/api/auth/validate-otp", auth2, { headers: headers }).pipe(
     catchError((error) => {
        console.error('Error occurred while validating OTP:', error); 
        return throwError(() => error);
      })
    );
  }
}
