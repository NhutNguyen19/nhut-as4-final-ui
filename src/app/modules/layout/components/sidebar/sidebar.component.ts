import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SubSidebarComponent } from '../sub-sidebar/sub-sidebar.component';
import { SubOrderComponent } from '../sub-order/sub-order.component';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, SubSidebarComponent, SubOrderComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  @Input() isAuthenticated: boolean = false;
  onLogout(): void {
    this.authService.logout().subscribe(
      () => {
        // Handle successful logout
        localStorage.removeItem('token'); // Remove token from localStorage
        this.isAuthenticated = false;
        this.router.navigate(['/auth/sign-in']); // Redirect to login page or any other page
      },
      (error) => {
        // Handle error case
        console.error('Logout failed', error);
      }
    );
  }
}
