export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: UserData;
}

export interface UserData {
  id: string;
  username: string;
  name: string;
  email: string;
}