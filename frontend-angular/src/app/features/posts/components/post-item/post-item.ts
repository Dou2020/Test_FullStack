import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../model/post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-item',
  imports: [CommonModule],
  templateUrl: './post-item.html',
  styleUrl: './post-item.css',
})
export class PostItem {
  @Input() post!: Post;
  @Input() isAuthenticated = false;
  @Output() onEdit = new EventEmitter<Post>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onView = new EventEmitter<string>();

  editPost() {
    this.onEdit.emit(this.post);
  }

  deletePost() {
    if (this.post._id) {
      this.onDelete.emit(this.post._id);
    }
  }

  viewPost() {
    if (this.post._id) {
      this.onView.emit(this.post._id);
    }
  }
}
