import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
//import { AppUser, ViewUserEmployeModel, ViewUserPatientModel } from '../models/public/appUser';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private TOKEN_KEY = 'auth_token';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Guardar token en localStorage (cuando hagas login)
  login(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  // Obtener token actual
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  // Eliminar token (logout)
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem('user_data'); // También eliminar datos del usuario
    }
  }

  // Saber si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
