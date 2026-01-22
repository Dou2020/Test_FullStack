import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface UserData {
  id: string;
  username: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private TOKEN_KEY = 'auth_token';
  private USER_DATA_KEY = 'user_data';

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

  // Guardar datos del usuario
  setUserData(userData: UserData): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
    }
  }

  // Obtener datos del usuario
  getUserData(): UserData | null {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem(this.USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  // Eliminar token (logout)
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_DATA_KEY);
    }
  }

  // Saber si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Obtener nombre del usuario actual
  getCurrentUsername(): string | null {
    const userData = this.getUserData();
    return userData ? userData.username : null;
  }

  // Obtener nombre completo del usuario actual
  getCurrentUserFullName(): string | null {
    const userData = this.getUserData();
    return userData ? userData.name : null;
  }

  // Obtener email del usuario actual
  getCurrentUserEmail(): string | null {
    const userData = this.getUserData();
    return userData ? userData.email : null;
  }

  // Obtener ID del usuario actual
  getCurrentUserId(): string | null {
    const userData = this.getUserData();
    return userData ? userData.id : null;
  }
}
