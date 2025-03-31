import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { LogoutRequest } from '../models/Auth';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl; // Sử dụng URL từ environment

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      console.log('🔍 Kiểm tra token trong localStorage:', token);
      if (token) {
        console.log('✅ Token hợp lệ, cập nhật trạng thái đăng nhập!');
        this.isAuthenticatedSubject.next(true);
      } else {
        console.log('❌ Không có token, trạng thái đăng nhập = false');
      }
    }
  }

  logout(): Observable<void> {
    return new Observable<void>((observer) => {
      localStorage.removeItem('token'); // Xóa token khỏi localStorage
      this.isAuthenticatedSubject.next(false); // Cập nhật trạng thái
      this.router.navigate(['/auth/sign-in']).then(() => {
        observer.next();
        observer.complete();
      });
    });
  }

  /** Kiểm tra đăng nhập */
  isAuthenticated(): Observable<boolean> {
    if (!isPlatformBrowser(this.platformId)) return of(false);

    const token = localStorage.getItem('token');
    if (!token) {
      this.isAuthenticatedSubject.next(false);
      return of(false);
    }

    // Nếu đã xác thực trước đó, không cần gọi API lại
    if (this.isAuthenticatedSubject.value) return of(true);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http
      .post<{ data: { active: boolean } }>(
        `${this.baseUrl}/auth/introspect`,
        { token },
        { headers }
      )
      .pipe(
        map((response) => response.data.active),
        tap((authenticated) => this.isAuthenticatedSubject.next(authenticated)),
        catchError(() => {
          this.isAuthenticatedSubject.next(false);
          return of(false);
        })
      );
  }

  register(user: {
    username: string;
    password: string;
    email: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, user);
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http
      .post<{ code: number; message: string; data: { token: string } }>(
        `${this.baseUrl}/auth/login`,
        credentials
      )
      .pipe(
        tap((response) => {
          console.log('Full response:', response); // Debug API response
          const token = response?.data?.token;
          if (isPlatformBrowser(this.platformId) && token) {
            localStorage.setItem('token', token);
            this.isAuthenticatedSubject.next(true);
            console.log(
              '🔥 Trạng thái đăng nhập sau khi login:',
              this.isAuthenticatedSubject.value
            );
          } else {
            console.error('❌ Token bị undefined hoặc null:', response);
          }
        }),

        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return throwError(() => new Error('Tài khoản không tồn tại.'));
          } else if (error.status === 401 || error.status === 403) {
            return throwError(
              () => new Error('Tài khoản của bạn không được phép đăng nhập.')
            );
          }
          return throwError(
            () => new Error('Đăng nhập thất bại. Vui lòng thử lại.')
          );
        })
      );
  }
}
