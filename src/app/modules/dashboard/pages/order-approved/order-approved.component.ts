import { dashboardRoutes } from './../../dashboard.routes';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/models/Order';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-approved',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './order-approved.component.html',
  styleUrl: './order-approved.component.scss',
})
export class OrderApprovedComponent implements OnInit {
  itemsPerPage = 5; // Số lượng đơn hàng trên mỗi trang
  paginatedOrders: Order[] = [];
  orders: Order[] = [];
  currentPage = 1; // Trang hiện tại
  totalPages = 0; // Tổng số trang
  paginatedRows: any[] = [];

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadApprovedOrders(); // ✅ Tải danh sách đơn hàng khi mở trang
  }

  loadApprovedOrders(): void {
    this.orderService.getApprovedOrders().subscribe({
      next: (response: { data: Order[] }) => {
        this.orders =
          response.data?.filter((order) => order.status === 'APPROVED') || [];
        this.updatePagination();
      },
      error: (error) => {
        console.error('❌ Lỗi khi tải danh sách đơn hàng:', error);
      },
      complete: () => {
        console.log('✅ Hoàn thành tải danh sách đơn hàng APPROVED');
      },
    });
  }

  updatePagination() {
    if (!this.orders || this.orders.length === 0) {
      this.paginatedOrders = [];
      this.totalPages = 0;
      return;
    }

    this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
    this.currentPage = 1; // Đặt lại trang đầu tiên khi cập nhật
    this.paginatedOrders = this.orders.slice(0, this.itemsPerPage);
  }

  viewOrderDetail(orderId: string): void {
    this.router.navigate(['/dashboard/order-detail'], {
      queryParams: { id: orderId },
    });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginate();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginate();
    }
  }

  paginate() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedOrders = this.orders.slice(start, end);
  }
}
