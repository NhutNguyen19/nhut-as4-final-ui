import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // ✅ Import ReactiveFormsModule
})
export class SignInComponent {
  signInForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false),
  });

  onSubmit() {
    if (this.signInForm.valid) {
      console.log('Form Submitted!', this.signInForm.value);
    }
  }
}
