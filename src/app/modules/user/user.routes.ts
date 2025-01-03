import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'user-list',
    loadComponent: () => import('./user-list/user-list.component').then(c => c.UserListComponent)
  },
];

export default routes;
