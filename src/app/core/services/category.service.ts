import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Category {
  id?: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCategories(): Observable<{ data: Category[] }> {
    return this.http.get<{ data: Category[] }>(this.baseUrl, {
      headers: this.getAuthHeaders(),
    });
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/save`, category, {
      headers: this.getAuthHeaders(),
    });
  }

  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}/update`, category, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteCategory(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}/delete`, {
      headers: this.getAuthHeaders(),
    });
  }
}
