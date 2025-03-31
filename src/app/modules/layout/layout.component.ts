import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SubSidebarComponent } from './components/sub-sidebar/sub-sidebar.component';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  isAuthenticated = false;
  isLoading = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef, // ✅ Fix lỗi cập nhật view
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.isAuthenticated$.subscribe((authenticated) => {
        this.isAuthenticated = authenticated;
        this.isLoading = false; // ✅ Ẩn loading sau khi xác thực
        this.cdr.detectChanges(); // ✅ Fix lỗi cập nhật UI

        // Nếu chưa đăng nhập => Chuyển hướng về trang login
        if (!authenticated) {
          this.router.navigate(['/auth/sign-in']);
        }
      });
    }
  }
}
