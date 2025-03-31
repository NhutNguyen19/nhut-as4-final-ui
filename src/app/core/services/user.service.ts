import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserMyInfo, UserResponse } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserResponse> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('Bạn chưa đăng nhập!'));
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Lấy token từ AuthService
    });

    return this.http
      .get<UserResponse>(`${this.baseUrl}/users`, { headers })
      .pipe(
        catchError((error) => {
          console.error('Lỗi khi tải danh sách user:', error);
          return throwError(() => new Error('Không thể lấy danh sách user!'));
        })
      );
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }

  getMyInfo(): Observable<UserMyInfo> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('Bạn chưa đăng nhập!'));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Attach the token to Authorization header
    });

    return this.http.get<UserMyInfo>(`${this.baseUrl}/users/my-info`, {
      headers,
    });
  }
}
