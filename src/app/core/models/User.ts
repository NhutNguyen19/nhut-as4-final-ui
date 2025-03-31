export interface User {
  id?: string;
  username: string;
  email: string;
  roles: string;
}

export interface UserResponse {
  code: number;
  message: string;
  data: User[]; // Danh sách user
}

export interface UserMyInfo {
  code: number;
  message: string;
  data: User; // Danh sách user
}
