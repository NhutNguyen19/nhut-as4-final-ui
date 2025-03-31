// src/app/components/my-info/my-info.component.ts
import { Component, OnInit } from '@angular/core';
import { UserMyInfo, UserResponse } from '../../../../core/models/User';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css'],
})
export class MyInfoComponent implements OnInit {
  userInfo: UserMyInfo | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.isLoading = true; // Set loading to true while waiting for the response
    this.userService.getMyInfo().subscribe(
      (response) => {
        // Log the response data for debugging
        console.log('User info fetched successfully:', response);

        this.userInfo = response;
        this.isLoading = false;
      },
      (error) => {
        // Log the error for debugging
        console.error('Error fetching user info:', error);

        this.error = 'Failed to fetch user information';
        this.isLoading = false;
      }
    );
  }
}
