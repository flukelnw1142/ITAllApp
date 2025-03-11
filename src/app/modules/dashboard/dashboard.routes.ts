import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
  },
  {
    path: 'dashboard-v2',
    loadComponent: () => import('./dashboardV2/dashboard-v2/dashboard-v2.component').then(c => c.DashboardV2Component)
  },
];

export default routes;
