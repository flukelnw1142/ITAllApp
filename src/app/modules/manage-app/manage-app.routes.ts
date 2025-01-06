import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'manage-app',
    loadComponent: () => import('./manage-app/manage-app/manage-app.component').then(c => c.ManageAppComponent)
  },
];

export default routes;
