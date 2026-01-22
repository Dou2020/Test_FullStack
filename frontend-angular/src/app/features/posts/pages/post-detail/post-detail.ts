import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Post as PostModel } from '../../model/post.model';
import { Post as PostService } from '../../services/post';
import { LoadingSpinner } from '../../../../shared';
import { CommentList } from '../../../comments/components/comment-list/comment-list';
import { Comment } from '../../../comments/model/comment.model';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, LoadingSpinner, CommentList],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail implements OnInit {
  isLoading = false;
  error: string | null = null;
  postId: string | null = null;
  currentPost: PostModel | null = null;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id');
      
      if (this.postId) {
        this.loadPost(this.postId);
      }
    });
  }

  loadPost(id: string): void {
    this.isLoading = true;
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.currentPost = post;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el post';
        this.isLoading = false;
        console.error('Error loading post:', err);
      }
    });
  }

  editPost(): void {
    if (this.postId) {
      this.router.navigate(['/posts', this.postId, 'edit']);
    }
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

  onCommentAdded(comment: Comment): void {
    console.log('Nuevo comentario agregado:', comment);
  }

  onCommentDeleted(comment: Comment): void {
    console.log('Comentario eliminado:', comment);
  }
}
