import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgZorroAntdModule } from '../../../Shared/ng-zorro-antd.module';
import { ModalDataService } from '../../service/ModalDataService';
import { ManageAppService } from '../../service/manageApps.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-app-v2',
  standalone: true,
  imports: [
    FormsModule, CommonModule, NzModalModule, NzTableModule,
    NzButtonModule, NzFormModule, NzInputModule, ReactiveFormsModule, NgZorroAntdModule
  ],
  templateUrl: './add-app-v2.component.html',
  styleUrl: './add-app-v2.component.scss'
})
export class AddAppV2Component {
  appsId: any;
  @Input() isVisible = false;
  @Output() handleOk = new EventEmitter<any>();
  @Output() handleCancel = new EventEmitter<void>();
  @Input() modalInstance!: NzModalRef;

  appsForm!: FormGroup;
  previewIconSrc: string | null = null;
  uploadedIconFileName: string = '';
  iconFileName: string = '';
  appData: any;

  constructor(
    private fb: FormBuilder,
    private modalDataService: ModalDataService,
    private manageAppService: ManageAppService
  ) { }

  ngOnInit(): void {
    this.appsForm = this.fb.group({
      ApplicationName: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Category: ["IT", [Validators.required]],
      BackgroundColor: ["#000000", [Validators.required]],
      BackgroundColorNew: [""],
      BorderColor: ["#000000", [Validators.required]],
      BorderColorNew: [""],
      TextColor: ["", [Validators.required]],
      TextColorNew: [""],
      Icon: [""],
      IconFileName: [""],
      Url: ["", [Validators.required]],
      OrderIndex: [0, [Validators.required]],
      IsActive: [1, [Validators.required]],
    });

    this.appData = this.modalDataService.getAppData();
    if (this.appData) {
      this.loadAppsData(this.appData);
    }
  }

  loadAppsData(app: any): void {
    this.appsForm.patchValue({
      ApplicationName: app.ApplicationName,
      Description: app.Description,
      BackgroundColor: app.BackgroundColor,
      BorderColor: app.BorderColor,
      TextColor: app.TextColor,
      Icon: app.Icon,
      Url: app.Url,
      IsActive: app.IsActive,
      IconFileName: app.IconFileName,
      OrderIndex: app.OrderIndex
    });

    if (app.Icon) {
      this.previewIconSrc = app.Icon.includes("data:image/png;base64,") 
      ? app.Icon.replace(/^data:image\/png;base64,data:image\/png;base64,/, "data:image/png;base64,") 
      : `data:image/png;base64,${app.Icon}`;
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;

    const isPng = file.type === 'image/png';
    if (!isPng) {
      Swal.fire({ icon: 'error', title: 'Invalid File Type', text: 'Only PNG files are supported!' });
      return;
    }

    this.appsForm.patchValue({
      Icon: file,
      IconFileName: file.name,
    });

    this.iconFileName = file.name;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewIconSrc = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  save(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to save the changes?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitForm();
      }
    });
  }

  submitForm(): void {
    if (this.appsForm.valid) {
      const formData = new FormData();
      formData.append('fields', this.generateFields());
      formData.append('values', this.generateValues());

      if (this.appsForm.value.Icon instanceof File) {
        formData.append('files', this.appsForm.value.Icon);
      }

      const apiCall = this.appsId
        ? this.manageAppService.updateDataAll(this.appsId, formData)
        : this.manageAppService.addDataAll(formData);

      apiCall.subscribe({
        next: (response) => {
          Swal.fire('Success!', 'Your data has been saved.', 'success');
          this.handleCancelClick();
        },
        error: (error) => {
          Swal.fire('Error!', 'There was an error saving your data.', 'error');
        }
      });
    } else {
      this.appsForm.markAllAsTouched();
      Swal.fire('Invalid Form', 'Please fill out all required fields.', 'error');
    }
  }

  generateFields(): string {
    return `ApplicationName, Description, Category, BackgroundColor, BorderColor, TextColor, Url, OrderIndex, IsActive`;
  }

  generateValues(): string {
    return `'${this.appsForm.get('ApplicationName')?.value}', 
            '${this.appsForm.get('Description')?.value}',
            '${this.appsForm.get('Category')?.value}',
            '${this.appsForm.get('BackgroundColorNew')?.value || this.appsForm.get('BackgroundColor')?.value}',
            '${this.appsForm.get('BorderColorNew')?.value || this.appsForm.get('BorderColor')?.value}',
            '${this.appsForm.get('TextColorNew')?.value || this.appsForm.get('TextColor')?.value}',
            '${this.appsForm.get('Url')?.value}', 
            '${this.appsForm.get('OrderIndex')?.value}', 
            ${this.appsForm.get('IsActive')?.value ? 1 : 0}`;
  }

  handleCancelClick(): void {
    this.modalInstance.destroy();
  }
}