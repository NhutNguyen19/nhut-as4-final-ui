import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './modules/auth/pages/sign-up/sign-up.component';
import { SignInComponent } from './modules/auth/pages/sign-in/sign-in.component';
import { AuthComponent } from './modules/auth/auth.component';
import { NavbarComponent } from './modules/layout/components/navbar/navbar.component';
import { SidebarComponent } from './modules/layout/components/sidebar/sidebar.component';
import { LayoutComponent } from './modules/layout/layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Beagle Admin';
}
