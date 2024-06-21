import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storedRadioValue: string | null = null;

  constructor() {}

  storeRadioValue(value: string | null) {
    this.storedRadioValue = value;
  }

  getStoredRadioValue(): string | null {
    return this.storedRadioValue;
  }
}
