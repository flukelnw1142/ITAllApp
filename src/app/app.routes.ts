import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard/dashboard' },
  {
    path: "auth",
    loadChildren: () => import("./modules/authentication/authentication.routes"),
  },
  {
    path: "dashboard",
    loadChildren: () => import("./modules/dashboard/dashboard.routes"),
  },
];
