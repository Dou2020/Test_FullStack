import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty-state.html',
})
export class EmptyState {
  @Input() icon: 'inbox' | 'search' | 'file' | 'user' = 'inbox';
  @Input() title: string = 'No hay datos';
  @Input() message: string = 'No se encontraron resultados';
  @Input() actionButtonText?: string;
  @Output() actionClick = new EventEmitter<void>();

  onActionClick(): void {
    this.actionClick.emit();
  }
}
