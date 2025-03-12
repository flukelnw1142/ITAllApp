import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgZorroAntdModule } from '../../../Shared/ng-zorro-antd.module';
import { ModalDataService } from '../../service/ModalDataService';
import { AddAppComponent } from '../../add-app/add-app.component';
import { IApp } from '../../../interface/dashboard.interface';
import { ManageAppService } from '../../service/manageApps.service';

@Component({
  selector: 'app-manage-app',
  imports: [FormsModule, CommonModule, NzModalModule,
    NzTableModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NgZorroAntdModule],
  templateUrl: './manage-app.component.html',
  styleUrl: './manage-app.component.scss'
})
export class ManageAppComponent {
  apps = [
    { name: 'App 1', url: 'https://app1.com', status: 'Active' },
    { name: 'ทดสอบ 1', url: 'https://app2.com', status: 'Inactive' },
    { name: 'calendar', url: 'https://app3.com', status: 'Active' },
  ];

  appList: IApp[] = [];

  searchTerm: string = '';
  statusFilter: number = 0;
  filteredApps: IApp[] = [];

  constructor(
    private modalService: NzModalService,
    private modalDataService: ModalDataService,
    private manageAppService: ManageAppService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.manageAppService.getData().subscribe({
      next: (response: any) => {
        this.appList = response.map((app: any) => ({
          ...app,
          Icon: `data:image/png;base64,${app.Icon}`,
          status: app.IsActive ? 1 : 2
        }));
        this.filterApps();
      },
      error: (error) => {
        console.error("API error:", error);
      }
    });
  }

  onSearch() {
    this.filterApps();
  }

  onFilterStatus() {
    this.filterApps();
  }

  filterApps() {
    this.filteredApps = this.appList.filter((app) => {
      const matchesName = app.ApplicationName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus =
        +this.statusFilter === 0
          ? true
          : +this.statusFilter === 1
            ? app.status === 1
            : app.status === 2;
      return matchesName && matchesStatus;
    });
  }

  toggleStatus(app: any) {
    app.status = app.status === 1 ? 2 : 1;
    if(app.status === 2){
      app.status = 0
    }
    const id = app.ApplicationId;
    const fields = `IsActive = ${app.status}`;
    const formData = new FormData();
    formData.append('fields', fields);

    this.manageAppService.updateData(id,formData).subscribe({
    });
    this.filterApps();
  }

  onEdit(app: any) {
    this.modalDataService.setAppsId(app);
    const modal: NzModalRef = this.modalService.create({
      nzTitle: 'Edit User',
      nzContent: AddAppComponent,
      nzFooter: null
    });
    modal.afterOpen.subscribe(() => {
      const instance = modal.getContentComponent();
      instance.modalInstance = modal;
    });

    modal.afterClose.subscribe(() => {
      this.getData();
    });
  }

  onAdd() {
    this.modalDataService.clearData();
    const modal: NzModalRef = this.modalService.create({
      nzTitle: 'Add User',
      nzContent: AddAppComponent,
      nzFooter: null
    });

    modal.afterOpen.subscribe(() => {
      const instance = modal.getContentComponent();
      instance.modalInstance = modal;
    });
    modal.afterClose.subscribe(() => {
      this.getData();
    });
  }
}