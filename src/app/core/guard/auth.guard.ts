import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { tap, first, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    console.log('🚀 AuthGuard đang chạy...');

    return this.authService.isAuthenticated$.pipe(
      first(),
      tap((authenticated) => {
        console.log('✅ Trạng thái đăng nhập trong AuthGuard:', authenticated);
        if (!authenticated) {
          console.log('⛔ Chưa đăng nhập, chuyển hướng về /auth/sign-in');
          this.router.navigate(['/auth/sign-in']);
        }
      })
    );
  }
}
