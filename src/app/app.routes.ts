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
  {
    path: "manage",
    loadChildren: () => import("./modules/manage-app/manage-app.routes"),
  },
  {
    path: "dashboard-v2",
    loadChildren: () => import("./modules/dashboard/dashboard.routes"),
  },
];
