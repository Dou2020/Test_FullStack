import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.css',
})
export class LoadingSpinner {
  @Input() overlay: boolean = false; // Si es true, cubre toda la pantalla/contenedor
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() message: string = 'Cargando...';
  @Input() showMessage: boolean = true;

  get sizeClass(): string {
    const sizes = {
      small: 'h-6 w-6',
      medium: 'h-12 w-12',
      large: 'h-16 w-16'
    };
    return sizes[this.size];
  }
}
