import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Post as PostModel } from '../../model/post.model';
import { Post as PostService } from '../../services/post';
import { PostItem } from '../../components/post-item/post-item';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, PostItem],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList implements OnInit {
  posts: PostModel[] = [];
  isLoading = false;
  error: string | null = null;
  private platformId = inject(PLATFORM_ID);

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // Solo ejecutar en el navegador, no en SSR
    if (isPlatformBrowser(this.platformId)) {
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
    console.log('Editar post:', post);
    // Implementar navegación o modal de edición
  }

  handleDelete(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar este post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post._id !== id);
        },
        error: (err) => {
          this.error = 'Error al eliminar el post.';
          console.error('Error deleting post:', err);
        }
      });
    }
  }

  handleView(id: string): void {
    console.log('Ver post:', id);
    // Implementar navegación a detalle
  }
}
