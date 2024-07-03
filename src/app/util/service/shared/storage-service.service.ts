import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  // Store data in localStorage
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Retrieve data from localStorage
  get(key: string): any {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // Remove data from localStorage
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all data from localStorage
  clear(): void {
    localStorage.clear();
  }
}