import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDataService {
  private appData: any; // เก็บข้อมูล Application
  private isEditMode: boolean = false;

  setAppsId(app: any): void {
    this.appData = app;
    this.isEditMode = true;
  }
  clearData(): void {
    this.appData = [];
    this.isEditMode = false;
  }

  getAppData(): number {
    return this.appData;
  }

  getIsEditMode(): boolean {
    return this.isEditMode;
  }
}