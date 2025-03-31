import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule], // ✅ Import ReactiveFormsModule
})
export class SignInComponent {
  signInForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false], // 👈 Thêm rememberMe vào FormGroup
    });
  }

  onSubmit() {
    if (this.signInForm.invalid) return;

    const { username, password } = this.signInForm.value;

    this.authService.login({ username, password }).subscribe({
      next: (response) => {
        console.log('Full response:', response); // Debug full response
        const token = response?.data?.token;

        if (token) {
          console.log('Token nhận được:', token); // Kiểm tra token có hợp lệ không
          localStorage.setItem('token', token); // ✅ Lưu token
          console.log('Token đã lưu:', localStorage.getItem('token')); // Kiểm tra lưu thành công chưa
          this.router.navigate(['/dashboard/home']).then((navigated) => {
            this.checkHomePage();
            if (navigated) {
              console.log('✅ Chuyển hướng thành công!');
            } else {
              console.error('❌ Chuyển hướng thất bại!');
            }
          });
        } else {
          console.error('Token không tồn tại:', response);
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }

  checkHomePage() {
    setTimeout(() => {
      if (window.location.pathname === '/404') {
        alert('Trang Home không tồn tại. Quay về trang đăng nhập.');
        this.router.navigate(['/auth/sign-in']);
      }
    }, 500);
  }
}
