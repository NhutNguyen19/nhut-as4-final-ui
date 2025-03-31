import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sub-order',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './sub-order.component.html',
  styleUrl: './sub-order.component.scss',
})
export class SubOrderComponent {
  isOpen = false;

  toggleSubmenu() {
    this.isOpen = !this.isOpen;
  }
}
