export interface RegisterForm {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterPayload {
  username: string;
  name: string;
  email: string;
  password: string;
}