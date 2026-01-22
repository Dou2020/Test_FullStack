import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment, CreateCommentRequest } from '../../model/comment.model';
import { CommentService } from '../../services/comment';
import { CommentItem } from '../comment-item/comment-item';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CommentItem,
    LoadingSpinner,
    EmptyState,
    ConfirmDialog
  ],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.css',
})
export class CommentList implements OnInit {
  private readonly commentService = inject(CommentService);
  private readonly apiService = inject(ApiService);

  @Input({ required: true }) postId!: string;
  @Input() allowComments = true;
  @Output() commentAdded = new EventEmitter<Comment>();
  @Output() commentDeleted = new EventEmitter<Comment>();

  comments: Comment[] = [];
  isLoading = false;
  isSubmitting = false;
  showDeleteDialog = false;
  commentToDelete: Comment | null = null;
  isAuthenticated = false;

  // Formulario de nuevo comentario
  newComment: CreateCommentRequest = {
    postId: '',
    name: '',
    email: '',
    body: ''
  };

  ngOnInit(): void {
    this.newComment.postId = this.postId;
    this.loadUserData();
    this.loadComments();
  }

  private loadUserData(): void {
    this.isAuthenticated = this.apiService.isAuthenticated();
    
    if (this.isAuthenticated) {
      const userName = this.apiService.getCurrentUserFullName();
      const userEmail = this.apiService.getCurrentUserEmail();
      
      if (userName) {
        this.newComment.name = userName;
      }
      if (userEmail) {
        this.newComment.email = userEmail;
      }
    }
  }

  loadComments(): void {
    this.isLoading = true;
    this.commentService.getByPostId(this.postId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading comments:', error);
        this.isLoading = false;
      }
    });
  }

  onSubmitComment(): void {
    if (!this.isValidComment()) return;

    this.isSubmitting = true;
    this.commentService.create(this.newComment).subscribe({
      next: (comment) => {
        this.comments.unshift(comment);
        this.resetForm();
        this.isSubmitting = false;
        this.commentAdded.emit(comment);
      },
      error: (error) => {
        console.error('Error creating comment:', error);
        this.isSubmitting = false;
      }
    });
  }

  confirmDelete(comment: Comment): void {
    this.commentToDelete = comment;
    this.showDeleteDialog = true;
  }

  onConfirmDelete(): void {
    if (!this.commentToDelete) return;

    const commentId = this.commentToDelete._id;
    this.commentService.delete(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c._id !== commentId);
        this.commentDeleted.emit(this.commentToDelete!);
        this.showDeleteDialog = false;
        this.commentToDelete = null;
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
        this.showDeleteDialog = false;
      }
    });
  }

  onCancelDelete(): void {
    this.showDeleteDialog = false;
    this.commentToDelete = null;
  }

  private isValidComment(): boolean {
    return !!this.newComment.name?.trim() && 
           !!this.newComment.email?.trim() && 
           !!this.newComment.body?.trim();
  }

  private resetForm(): void {
    const userName = this.isAuthenticated ? this.apiService.getCurrentUserFullName() || '' : '';
    const userEmail = this.isAuthenticated ? this.apiService.getCurrentUserEmail() || '' : '';
    
    this.newComment = {
      postId: this.postId,
      name: userName,
      email: userEmail,
      body: ''
    };
  }
}
