import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.html',
})
export class ConfirmDialog {
  @Input() isOpen: boolean = false;
  @Input() title: string = '¿Estás seguro?';
  @Input() message: string = 'Esta acción no se puede deshacer.';
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';
  @Input() type: 'danger' | 'warning' | 'info' = 'warning';
  @Input() loading: boolean = false;
  
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    if (!this.loading) {
      this.confirm.emit();
    }
  }

  onCancel(): void {
    if (!this.loading) {
      this.cancel.emit();
    }
  }

  onBackdropClick(event: MouseEvent): void {
    if (!this.loading && event.target === event.currentTarget) {
      this.onCancel();
    }
  }

  get confirmButtonClass(): string {
    const classes = {
      danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
      warning: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
      info: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
    };
    return classes[this.type];
  }

  get iconColor(): string {
    const colors = {
      danger: 'text-red-600',
      warning: 'text-yellow-600',
      info: 'text-indigo-600'
    };
    return colors[this.type];
  }
}
