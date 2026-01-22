import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/public/public-routing-module').then(m => m.PublicRoutingModule),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./features/posts/posts-routing-module').then(m => m.PostsRoutingModule),
  },
  { 
    path: '**', 
    redirectTo: 'auth/login'
  }
];
