import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RegisterPayload } from '../model/register.model';
import { AuthResponse } from '../model/login.model';
import { ApiService } from '../../../core/services/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Register {
  private http = inject(HttpClient);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  register(userData: RegisterPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => {
          // Guardar token y datos del usuario automáticamente
          this.apiService.login(response.accessToken);
          localStorage.setItem('user_data', JSON.stringify(response.user));
        })
      );
  }

  checkUsernameAvailability(username: string): Observable<{ available: boolean }> {
    // Endpoint para verificar disponibilidad (opcional, si el backend lo soporta)
    return this.http.get<{ available: boolean }>(`${this.apiUrl}/auth/check-username/${username}`);
  }

  checkEmailAvailability(email: string): Observable<{ available: boolean }> {
    // Endpoint para verificar disponibilidad (opcional, si el backend lo soporta)
    return this.http.get<{ available: boolean }>(`${this.apiUrl}/auth/check-email/${email}`);
  }
}
