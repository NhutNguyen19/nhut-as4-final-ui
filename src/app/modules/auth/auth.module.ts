import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { authRoutes } from './auth.routes';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  provideHttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(authRoutes), AuthComponent],
  providers: [provideHttpClient()],
})
export class AuthModule {}
