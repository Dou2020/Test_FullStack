import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Post as PostModel } from '../../model/post.model';
import { Post as PostService } from '../../services/post';
import { PostItem } from '../../components/post-item/post-item';
import { LoadingSpinner, EmptyState, ConfirmDialog } from '../../../../shared';
import { ApiService } from '../../../../core/services/api';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, PostItem, RouterModule, LoadingSpinner, EmptyState, ConfirmDialog],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList implements OnInit {
  posts: PostModel[] = [];
  isLoading = false;
  error: string | null = null;
  showDeleteDialog = false;
  postToDelete: string | null = null;
  isDeleting = false;
  isAuthenticated = false;
  private platformId = inject(PLATFORM_ID);

  constructor(
    private postService: PostService,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Solo ejecutar en el navegador, no en SSR
    if (isPlatformBrowser(this.platformId)) {
      this.isAuthenticated = this.apiService.isAuthenticated();
      this.loadPosts();
    }
  }

  loadPosts(): void {
    this.isLoading = true;
    this.error = null;
    
    this.postService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los posts. Por favor, intenta de nuevo.';
        this.isLoading = false;
        console.error('Error loading posts:', err);
      }
    });
  }

  handleEdit(post: PostModel): void {
    if (post._id) {
      this.router.navigate(['/posts', post._id, 'edit']);
    }
  }

  handleDelete(id: string): void {
    this.postToDelete = id;
    this.showDeleteDialog = true;
  }

  confirmDelete(): void {
    if (!this.postToDelete) return;
    
    this.isDeleting = true;
    this.postService.deletePost(this.postToDelete).subscribe({
      next: () => {
        this.posts = this.posts.filter(post => post._id !== this.postToDelete);
        this.showDeleteDialog = false;
        this.postToDelete = null;
        this.isDeleting = false;
      },
      error: (err) => {
        this.error = 'Error al eliminar el post.';
        this.showDeleteDialog = false;
        this.isDeleting = false;
        console.error('Error deleting post:', err);
      }
    });
  }

  cancelDelete(): void {
    this.showDeleteDialog = false;
    this.postToDelete = null;
  }

  handleView(id: string): void {
    this.router.navigate(['/posts', id]);
  }

  createNewPost(): void {
    this.router.navigate(['/posts/new']);
  }
}
