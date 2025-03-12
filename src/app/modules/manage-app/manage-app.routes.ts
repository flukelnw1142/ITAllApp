import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'manage-appIT',
    loadComponent: () => import('./manage-app/manage-app/manage-app.component').then(c => c.ManageAppComponent)
  },
  {
    path: 'add-appIT',
    loadComponent: () => import('./add-app/add-app.component').then(c => c.AddAppComponent)
  },
  {
    path: 'edit-appIT',
    loadComponent: () => import('./edit-app/edit-app.component').then(c => c.EditAppComponent)
  },
  {
    path: 'manage-app',
    loadComponent: () => import('./manage-app-v2/manage-app-v2.component').then(c => c.ManageAppV2Component)
  },
];

export default routes;