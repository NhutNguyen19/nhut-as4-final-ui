import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sub-sidebar',
  templateUrl: './sub-sidebar.component.html',
  styleUrls: ['./sub-sidebar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class SubSidebarComponent {
  isOpen = false;

  toggleSubmenu() {
    this.isOpen = !this.isOpen;
  }
}
