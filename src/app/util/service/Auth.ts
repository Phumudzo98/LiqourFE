import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
    
  username!: string;
  otp!: string;

  constructor() {}
}
