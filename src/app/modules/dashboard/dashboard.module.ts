import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routes';
import { provideHttpClient } from '@angular/common/http';
import { UserComponent } from './pages/user/user.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';
import { OrderApprovedComponent } from './pages/order-approved/order-approved.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    DashboardComponent,
    UserComponent,
    HomeComponent,
    ProductComponent,
    CategoryComponent,
    OrderApprovedComponent,
    OrderDetailComponent,
  ],
  providers: [provideHttpClient()],
})
export class DashboardModule {}
