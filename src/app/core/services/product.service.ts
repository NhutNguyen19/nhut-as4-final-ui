import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl; // Đổi thành URL backend

  constructor(private http: HttpClient) {}

  // ✅ Lấy danh sách sản phẩm (trả về { data: Product[] })
  getProducts(): Observable<{ data: Product[] }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ data: Product[] }>(`${this.baseUrl}/products`, {
      headers,
    });
  }

  // ✅ Thêm sản phẩm
  addProduct(product: Product): Observable<{ data: Product }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<{ data: Product }>(
      `${this.baseUrl}/products/save`,
      product,
      { headers }
    );
  }

  // ✅ Cập nhật sản phẩm
  updateProduct(id: string, product: Product): Observable<{ data: Product }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<{ data: Product }>(
      `${this.baseUrl}/products/${id}/update`,
      product,
      { headers }
    );
  }

  // ✅ Xóa sản phẩm
  deleteProduct(id: string): Observable<{ message: string }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<{ message: string }>(
      `${this.baseUrl}/products/${id}/delete`,
      { headers }
    );
  }
}
