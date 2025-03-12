import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NgZorroAntdModule } from '../../../Shared/ng-zorro-antd.module';
import { Router } from '@angular/router';
import { ModalDataService } from '../../service/ModalDataService';
import { ManageAppService } from '../../service/manageApps.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-app-v2',
  imports: [FormsModule, CommonModule, NzModalModule,
    NzTableModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NgZorroAntdModule],
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
  uploadedIconFileName: string = ''; // ชื่อไฟล์เดิมจากข้อมูล
  iconFileName: string = '';
  appData: any;

  constructor(private fb: FormBuilder,
    private router: Router,
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
      Icon: ["", [Validators.required]],
      IconFileName: ["", [Validators.required]],
      Url: ["", [Validators.required]],
      OrderIndex: [0, [Validators.required]],
      IsActive: [1, [Validators.required]],
    });
    this.appData = this.modalDataService.getAppData();
    if (this.appData) {
      this.appsForm.get('BackgroundColor')?.disable();
      this.appsForm.get('BorderColor')?.disable();
      this.appsForm.get('TextColor')?.disable();
      this.uploadedIconFileName = this.appData.IconFileName
      this.appsId = this.appData.ApplicationId
      this.loadAppsData(this.appData);
    }
  }

  handleCancelClick(): void {
    this.modalInstance.destroy();
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
    console.log("this.appsForm.value", this.appsForm.value);
    this.appsForm.patchValue({
      OrderIndex: this.appData.OrderIndex !== undefined ? this.appData.OrderIndex : 0,
      IsActive: this.appData.IsActive !== undefined ? this.appData.IsActive : 1,
    });
    console.log("this.appsForm.value After", this.appsForm.value);
    if (this.appsId) {
      this.onUpdate();
    }
    else {
      if (this.appsForm.valid) {
        const fields = 'ApplicationName, Description, Category, BackgroundColor, BorderColor, TextColor, Url, OrderIndex, IsActive';
        const values = `'${this.appsForm.get('ApplicationName')?.value}', 
          '${this.appsForm.get('Description')?.value}',
          '${this.appsForm.get('Category')?.value}',
          '${this.appsForm.get('BackgroundColor')?.value}',
          '${this.appsForm.get('BorderColor')?.value}',
          '${this.appsForm.get('TextColor')?.value}',
          '${this.appsForm.get('Url')?.value}', 
          0, 
          ${this.appsForm.get('IsActive')?.value ? 1 : 0}
         
          `;

        // สร้าง FormData
        const formData = new FormData();
        formData.append('fields', fields);
        formData.append('values', values);

        // ถ้ามีไฟล์ที่ต้องส่งไปด้วย
        const iconFile: File = this.appsForm.get('Icon')?.value;
        if (iconFile) {
          formData.append('files', iconFile);
        }


        this.manageAppService.addDataAll(formData).subscribe({
          next: (response) => {
            Swal.fire('Saved!', 'Your data has been saved.', 'success');
            this.handleCancelClick();
          },
          error: (error) => {
            console.error('Error saving data', error);
            Swal.fire('Error!', 'There was an error saving your data.', 'error');
          }
        });
      }
      else {
        this.appsForm.markAllAsTouched();
        Swal.fire('Invalid Form', 'Please fill out all required fields.', 'error');
      }
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      // ตรวจสอบประเภทไฟล์
      const isPng = file.type === 'image/png';
      if (!isPng) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Only PNG files are supported!',
        });
        return; // ไม่รับไฟล์หากไม่ใช่ .png
      }

      // เก็บข้อมูลไฟล์
      this.appsForm.patchValue({
        Icon: file, // เก็บไฟล์จริง
        IconFileName: file.name, // เก็บชื่อไฟล์
      });
      this.iconFileName = file.name; // อัปเดตชื่อไฟล์เพื่อแสดงใน UI
    }
  }

  loadAppsData(app: any): void {
    console.log("app : ", app);

    this.appsForm.patchValue({
      ApplicationName: app.ApplicationName,
      Description: app.Description,
      BackgroundColor: app.BackgroundColor,
      BorderColor: app.BorderColor,
      TextColor: app.TextColor,
      Url: app.Url,
      IsActive: app.IsActive,
      IconFileName: app.IconFileName,
      OrderIndex: app.OrderIndex
    });
  }

  onUpdate(): void {
    let fields = ''
    const formData = new FormData();
    this.appsForm.get('BackgroundColor')?.enable();
    this.appsForm.get('BorderColor')?.enable();
    this.appsForm.get('TextColor')?.enable();


    const backgroundColor = this.appsForm.value.BackgroundColorNew 
    ? this.appsForm.value.BackgroundColorNew 
    : this.appsForm.value.BackgroundColor;

    const borderColor = this.appsForm.value.BorderColorNew
    ? this.appsForm.value.BorderColorNew 
    : this.appsForm.value.BorderColor;

    const textColor = this.appsForm.value.TextColorNew 
    ? this.appsForm.value.TextColorNew 
    : this.appsForm.value.TextColor;

    if (this.appsForm.value.Icon) {
      fields = `ApplicationName = '${this.appsForm.value.ApplicationName}',
      Description = '${this.appsForm.value.Description}',
      Category = '${this.appsForm.value.Category}',  
      BackgroundColor = '${backgroundColor}',  
      BorderColor = '${borderColor}',    
      TextColor = '${textColor}',    
      Url = '${this.appsForm.value.Url}', 
      IconFileName = '${this.appsForm.value.IconFileName}'`;
      const iconFile: File = this.appsForm.get('Icon')?.value;
      if (iconFile) {
        formData.append('files', iconFile);
      }
    }
    else {
      fields = `ApplicationName = '${this.appsForm.value.ApplicationName}', 
      Description = '${this.appsForm.value.Description}',
      Category = '${this.appsForm.value.Category}',  
      BackgroundColor = '${backgroundColor}',  
      BorderColor = '${borderColor}',  
      TextColor = '${textColor}',     
      Url = '${this.appsForm.value.Url}'`;
    }

    formData.append('fields', fields);

    this.manageAppService.updateDataAll(this.appsId, formData).subscribe({
    });
    Swal.fire('Update!', 'Your data has been Update.', 'success');
    this.handleCancelClick();
  }


}
