import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Iniciar Sesión'
  },
  {
    path: 'register',
    component: Register,
    title: 'Registrarse'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
