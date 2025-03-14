import { Injectable, OnInit } from '@angular/core';
import { CanActivate, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../app/modules/authentication/service/authservice';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}