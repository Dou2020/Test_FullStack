import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse } from '../model/login.model';
import { ApiService } from '../../../core/services/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Login {
  private http = inject(HttpClient);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          // Guardar token y datos del usuario usando ApiService
          this.apiService.login(response.accessToken);
          this.apiService.setUserData(response.user);
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => {
          // Guardar token y datos del usuario usando ApiService
          this.apiService.login(response.accessToken);
          this.apiService.setUserData(response.user);
        })
      );
  }

  logout(): void {
    this.apiService.logout();
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    return this.apiService.getUserData();
  }

  isAuthenticated(): boolean {
    return this.apiService.isAuthenticated();
  }
}
