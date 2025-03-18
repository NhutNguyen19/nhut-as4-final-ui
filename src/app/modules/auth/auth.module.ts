import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

@NgModule({
  imports: [CommonModule, RouterModule, SignInComponent, SignUpComponent],
  exports: [SignInComponent],
})
export class AuthModule {}
