import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() {}

  setToken = async (token: any) => {
    try {
      await Preferences.set({
        key: 'authToken',
        value: JSON.stringify(token),
        
      });
      console.log('Token set successfully');
    } catch (error) {
      console.error('Error setting token:', error);
    }
  };
  
  getToken = async () => {
    try {
      const { value } = await Preferences.get({ key: 'authToken' });
      //console.log(value);
      return value;
     // return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  };
  
  removeName = async () => {
    try {
      await Preferences.remove({ key: 'name' });
      console.log('Name removed successfully');
    } catch (error) {
      console.error('Error removing name:', error);
    }
  };

  getHost(): any {
    // Implementation for getHost()
  }

  setSimpToken(token:any)
  {
    localStorage.setItem('uToken',token)
    console.log(token);
  }

 
}
