import { Routes } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./modules/auth/pages/sign-in/sign-in.component').then(
            (m) => m.SignInComponent
          ),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./modules/auth/pages/sign-up/sign-up.component').then(
            (m) => m.SignUpComponent
          ),
      },
      { path: '**', redirectTo: 'sign-in' },
    ],
  },
  { path: '', redirectTo: 'auth/sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/sign-in' },
];
