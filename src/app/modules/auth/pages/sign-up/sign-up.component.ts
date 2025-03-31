import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  standalone: true,
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp nhau không
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsNotMatch: true };
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.isSubmitting = true;
    const { username, email, password } = this.signUpForm.value;

    this.authService.register({ username, email, password }).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        alert('Đăng ký thành công!');
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('Registration error', error);
        alert('Đăng ký thất bại!');
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
