import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)
  },
];

export default routes;
