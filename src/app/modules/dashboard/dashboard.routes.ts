import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderApprovedComponent } from './pages/order-approved/order-approved.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { MyInfoComponent } from './pages/my-info/my-info.component';

export const dashboardRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'product', component: ProductComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'order', component: OrderComponent },
  { path: 'order-approved', component: OrderApprovedComponent },
  { path: 'order-detail', component: OrderDetailComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'my-info', component: MyInfoComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];
