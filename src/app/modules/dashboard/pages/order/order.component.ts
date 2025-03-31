import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';
import { CommonModule } from '@angular/common';
import { Order } from '../../../../core/models/Order';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
})
export class OrderComponent implements OnInit {
  itemsPerPage = 5; // Số lượng đơn hàng trên mỗi trang
  paginatedOrders: Order[] = [];
  orders: Order[] = [];
  currentPage = 1; // Trang hiện tại
  totalPages = 0; // Tổng số trang
  paginatedRows: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadPendingOrders(); // ✅ Tải danh sách đơn hàng khi mở trang
  }

  loadPendingOrders(): void {
    this.orderService.getPendingOrders().subscribe({
      next: (response: { data: Order[] }) => {
        this.orders =
          response.data?.filter((order) => order.status === 'PENDING') || [];
        this.updatePagination();
      },
      error: (error) => {
        console.error('❌ Lỗi khi tải danh sách đơn hàng:', error);
      },
      complete: () => {
        console.log('✅ Hoàn thành tải danh sách đơn hàng PENDING');
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
  approveOrder(orderId: string, isApproved: boolean) {
    console.log(
      `📢 Đang gửi yêu cầu: orderId = ${orderId}, isApproved = ${isApproved}`
    );
    this.orderService.approveOrder(orderId, isApproved).subscribe({
      next: (response) => {
        console.log('Phản hồi API:', response);
        this.loadPendingOrders(); // ✅ Cập nhật danh sách sau khi xử lý
      },
      error: (error) => {
        console.error('Lỗi khi cập nhật đơn hàng:', error);
      },
    });
  }
}
