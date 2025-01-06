import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'manage-app',
    loadComponent: () => import('./manage-app/manage-app/manage-app.component').then(c => c.ManageAppComponent)
  },
  {
    path: 'add-app',
    loadComponent: () => import('./add-app/add-app.component').then(c => c.AddAppComponent)
  },
  {
    path: 'edit-app',
    loadComponent: () => import('./edit-app/edit-app.component').then(c => c.EditAppComponent)
  },
];

export default routes;
