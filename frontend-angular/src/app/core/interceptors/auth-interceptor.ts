import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiService } from '../services/api';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(ApiService);
  const router = inject(Router);
  const token = authService.getToken();

  // No agregar token a las rutas de autenticación
  const isAuthRoute = req.url.includes('/auth/login') || req.url.includes('/auth/register');

  // Clonar la petición y agregar el token si existe y no es una ruta de auth
  let clonedReq = req;
  if (token && !isAuthRoute) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Manejar la respuesta y errores
  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si es error 401 (no autorizado) y no estamos en una ruta de auth
      if (error.status === 401 && !isAuthRoute) {
        console.warn('Sesión expirada o no autorizada. Redirigiendo a login...');
        authService.logout();
        router.navigate(['/login'], {
          queryParams: { returnUrl: router.url }
        });
      }

      // Si es error 403 (prohibido)
      if (error.status === 403) {
        console.warn('Acceso prohibido a este recurso');
      }

      return throwError(() => error);
    })
  );
};
