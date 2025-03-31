import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDashboardData() {
    const token = localStorage.getItem('token'); // ✅ Lấy token từ localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // ✅ Thêm header Authorization

    return this.http.get<any>(`${this.baseUrl}/home`, { headers });
  }
}
