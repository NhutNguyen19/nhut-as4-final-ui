import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HomeService } from '../../../../core/services/home.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(
    private titleService: Title,
    private homeService: HomeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.titleService.setTitle('Trang chủ');
  }

  dashboardData: any = {};

  token: string | null = null;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Chỉ truy cập localStorage khi chạy trên trình duyệt
      this.token = localStorage.getItem('token');
      console.log('Token:', this.token); // Bạn có thể sử dụng token hoặc xử lý logic ở đây
    }
  }

  loadDashboardData(): void {
    this.homeService.getDashboardData().subscribe((response) => {
      if (response.code === 1000) {
        this.dashboardData = response.data;
      }
    });
  }
}
