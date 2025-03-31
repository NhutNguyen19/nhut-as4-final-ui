import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LayoutComponent } from './modules/layout/layout.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLoading = true;
  isAuthenticated = false;

  constructor(
    private authService: AuthService,
    private router: Router, // Khai báo đư��ng d��n vào RouterModule để quản lý các trang
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.isAuthenticated$.subscribe();
    }
  }

  isLoginPage(): boolean {
    return this.router.url.startsWith('/auth');
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Đăng ký vào Observable để lấy giá trị trả về
      this.authService.isAuthenticated().subscribe((authenticated) => {
        this.isAuthenticated = authenticated;
        this.isLoading = false; // Sau khi kiểm tra trạng thái đăng nhập, tắt loading
      });
    }
  }
}
