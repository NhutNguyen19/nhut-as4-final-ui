import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';

export const dashboardRoutes: Routes = [
  { path: 'home', component: HomeComponent },
];
