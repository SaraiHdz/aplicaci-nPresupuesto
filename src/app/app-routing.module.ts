import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importar componentes
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  { path: 'home' , component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login' , component: LoginComponent},
  { path: 'registro' , component: RegistroComponent},
  { path: '**' , redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
