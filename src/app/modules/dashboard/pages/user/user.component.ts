import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class UserComponent implements OnInit {
  users: any[] = [];
  paginatedUsers: any[] = [];
  itemsPerPage = 5;
  currentPage = 1;
  totalPages = 1;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        console.log('📌 API Response:', response); // Debug
        this.users = response.data || []; // Lấy danh sách user
        this.updatePagination();
      },
      error: (err) => {
        console.error('❌ Lỗi khi lấy danh sách user:', err);
        alert('Không thể tải danh sách user. Vui lòng đăng nhập.');
      },
    });
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  editUser(user: any) {
    console.log('Chỉnh sửa User:', user);
    // Chuyển hướng đến trang sửa user
  }

  deleteUser(userId: string) {
    if (confirm('Bạn có chắc chắn muốn xóa User này không?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter((user) => user.id !== userId);
        this.updatePagination();
      });
    }
  }
}
