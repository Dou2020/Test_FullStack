import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { ApiService } from '../services/api';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(ApiService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  return next(req);
};
