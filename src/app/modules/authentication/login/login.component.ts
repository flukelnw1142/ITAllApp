import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SharedModule } from '../../Shared/shared.module';
import { NgZorroAntdModule } from '../../Shared/ng-zorro-antd.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SharedModule, NgZorroAntdModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';
  passwordFieldType: string = 'password';
  isPasswordVisible = false;
  isForgotPasswordModalVisible = false;
  forgotPasswordUsername = '';
  isLoading: boolean = false;
  showPDPA: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

  }

  login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { username, password } = this.loginForm.value;


    }
  }
}
