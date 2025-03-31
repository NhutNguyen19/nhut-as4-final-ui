import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPendingOrders(): Observable<{ data: Order[] }> {
    // ✅ Định nghĩa kiểu dữ liệu chính xác
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ data: Order[] }>(`${this.baseUrl}/orders`, {
      headers,
    });
  }

  getApprovedOrders(): Observable<{ data: Order[] }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ data: Order[] }>(`${this.baseUrl}/orders/approved`, {
      headers,
    });
  }

  approveOrder(orderId: string, isApproved: boolean): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (!token) {
      console.error('⚠ Không tìm thấy token trong localStorage!');
      return throwError(() => new Error('Token không hợp lệ!'));
    }

    const url = `${this.baseUrl}/orders/approve?orderId=${orderId}&isApproved=${isApproved}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<any>(url, {}, { headers }).pipe(
      catchError((error) => {
        console.error('❌ Lỗi API:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  getOrderById(orderId: string): Observable<{ data: Order }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/orders/order?id=${orderId}`;

    console.log(`📢 Gọi API lấy đơn hàng: ${url}`);

    return this.http.get<{ data: Order }>(url, { headers }).pipe(
      tap((response) => console.log('✅ API Response:', response)),
      catchError((error) => {
        console.error('❌ Lỗi khi lấy đơn hàng:', error);
        return throwError(() => new Error('Không thể lấy thông tin đơn hàng!'));
      })
    );
  }
}
