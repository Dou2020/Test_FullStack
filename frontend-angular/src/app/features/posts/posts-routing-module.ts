import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/post-list/post-list').then(m => m.PostList),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/post-create/post-create').then(m => m.PostCreate),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/post-detail/post-detail').then(m => m.PostDetail),
  },
  {
    path: ':id/edit',
    loadComponent: () =>
      import('./pages/post-create/post-create').then(m => m.PostCreate),
  },
  { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
