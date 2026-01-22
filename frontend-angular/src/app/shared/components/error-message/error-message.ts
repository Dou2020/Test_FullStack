import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-message.html',
})
export class ErrorMessage {
  @Input() control: AbstractControl | null = null;
  @Input() fieldName: string = 'Este campo';
  @Input() customMessages: { [key: string]: string } = {};

  get errorMessage(): string | null {
    if (!this.control || !this.control.errors || !this.control.touched) {
      return null;
    }

    const errors = this.control.errors;
    
    // Verificar mensajes personalizados primero
    for (const errorKey in errors) {
      if (this.customMessages[errorKey]) {
        return this.customMessages[errorKey];
      }
    }

    // Mensajes por defecto
    if (errors['required']) {
      return `${this.fieldName} es requerido`;
    }
    
    if (errors['email']) {
      return 'Formato de email inválido';
    }
    
    if (errors['minlength']) {
      const requiredLength = errors['minlength'].requiredLength;
      return `${this.fieldName} debe tener al menos ${requiredLength} caracteres`;
    }
    
    if (errors['maxlength']) {
      const requiredLength = errors['maxlength'].requiredLength;
      return `${this.fieldName} no puede exceder ${requiredLength} caracteres`;
    }
    
    if (errors['min']) {
      return `El valor mínimo es ${errors['min'].min}`;
    }
    
    if (errors['max']) {
      return `El valor máximo es ${errors['max'].max}`;
    }
    
    if (errors['pattern']) {
      return `${this.fieldName} tiene un formato inválido`;
    }
    
    if (errors['passwordMismatch']) {
      return 'Las contraseñas no coinciden';
    }

    // Error genérico si no hay match
    return 'Este campo tiene un error';
  }

  get hasError(): boolean {
    return !!this.errorMessage;
  }
}
