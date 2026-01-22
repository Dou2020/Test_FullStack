import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post as PostModel } from '../../model/post.model';
import { Post as PostService } from '../../services/post';
import { LoadingSpinner, ErrorMessage } from '../../../../shared';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingSpinner, ErrorMessage],
  templateUrl: './post-create.html',
  styleUrl: './post-create.css',
})
export class PostCreate implements OnInit {
  postForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  isSaving = false;
  error: string | null = null;
  postId: string | null = null;
  currentPost: PostModel | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      published: [false]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id');
      
      if (this.postId) {
        // Modo edición
        this.isEditMode = true;
        this.loadPost(this.postId);
      }
      // Si no hay ID, es modo creación (por defecto)
    });
  }

  loadPost(id: string): void {
    this.isLoading = true;
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.currentPost = post;
        this.postForm.patchValue({
          title: post.title,
          body: post.body,
          author: post.author,
          tags: post.tags.join(', '),
          imageUrl: post.imageUrl,
          published: post.published
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el post';
        this.isLoading = false;
        console.error('Error loading post:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      Object.keys(this.postForm.controls).forEach(key => {
        this.postForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formValue = this.postForm.value;
    const postData: PostModel = {
      title: formValue.title,
      body: formValue.body,
      author: formValue.author,
      tags: formValue.tags.split(',').map((tag: string) => tag.trim()),
      imageUrl: formValue.imageUrl,
      published: formValue.published
    };

    this.isSaving = true;
    this.error = null;

    if (this.isEditMode && this.postId) {
      this.postService.updatePost(this.postId, postData).subscribe({
        next: () => {
          this.isSaving = false;
          this.router.navigate(['/posts']);
        },
        error: (err) => {
          this.error = 'Error al actualizar el post';
          this.isSaving = false;
          console.error('Error updating post:', err);
        }
      });
    } else {
      this.postService.createPost(postData).subscribe({
        next: () => {
          this.isSaving = false;
          this.router.navigate(['/posts']);
        },
        error: (err) => {
          this.error = 'Error al crear el post';
          this.isSaving = false;
          console.error('Error creating post:', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

  getTitle(): string {
    return this.isEditMode ? 'Editar Post' : 'Crear Nuevo Post';
  }
}
