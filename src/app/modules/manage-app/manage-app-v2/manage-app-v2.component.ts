import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgZorroAntdModule } from '../../Shared/ng-zorro-antd.module';
import { ModalDataService } from '../service/ModalDataService';
import { DashboardService } from '../../dashboard/service/dashboard.service';
import { ManageAppService } from '../service/manageApps.service';
import Swal from 'sweetalert2';
import { AddAppV2Component } from './add-app-v2/add-app-v2.component';

@Component({
  selector: 'app-manage-app-v2',
  imports: [FormsModule, CommonModule, NzModalModule,
    NzTableModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NgZorroAntdModule],
  templateUrl: './manage-app-v2.component.html',
  styleUrl: './manage-app-v2.component.scss'
})
export class ManageAppV2Component {
  appList: any[] = [];

  searchTerm: string = '';
  statusFilter: number = 0;
  filteredApps: any[] = [];

  constructor(
    private modalService: NzModalService,
    private modalDataService: ModalDataService,
    private dashboardService: DashboardService,
    private manageAppService: ManageAppService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
      this.manageAppService.getDataAll().subscribe({
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
  
      this.manageAppService.updateDataAll(id,formData).subscribe({
      });
      Swal.fire('Update!', 'Your data has been Update.', 'success');
      this.filterApps();
    }
  
    onEdit(app: any) {
      // this.modalDataService.setAppsId(app);
      // const modal: NzModalRef = this.modalService.create({
      //   nzTitle: 'Edit User',
      //   nzContent: AddAppComponent,
      //   nzFooter: null
      // });
      // modal.afterOpen.subscribe(() => {
      //   const instance = modal.getContentComponent();
      //   instance.modalInstance = modal;
      // });
  
      // modal.afterClose.subscribe(() => {
      //   this.getData();
      // });
    }
  
    onAdd() {
      this.modalDataService.clearData();
      const modal: NzModalRef = this.modalService.create({
        nzTitle: 'Add App',
        nzContent: AddAppV2Component,
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
