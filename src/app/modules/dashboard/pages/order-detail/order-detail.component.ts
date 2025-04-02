import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../../core/models/Order';
import { OrderService } from '../../../../core/services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  imports: [CommonModule, FormsModule],
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const orderId = params['id'];
      if (orderId) {
        this.fetchOrder(orderId);
      }
    });
  }

  fetchOrder(orderId: string): void {
    this.isLoading = true;
    this.orderService.getOrderById(orderId).subscribe({
      next: (response) => {
        this.order = response.data;
        this.fixOrderData();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      },
    });
  }

  fixOrderData(): void {
    if (this.order) {
      // Nếu totalAmount bị sai (0.0), thì tính lại từ orderItems
      if (this.order.totalAmount === 0) {
        this.order.totalAmount = this.order.orderItems.reduce(
          (sum, item) => sum + item.quantity * item.totalMoney,
          0
        );
      }

      // Nếu totalPrice của từng item bị sai, thì tính lại
      this.order.orderItems.forEach((item) => {
        if (item.totalMoney === 0) {
          item.totalMoney = item.quantity * item.totalMoney;
        }
      });
    }
  }
}
