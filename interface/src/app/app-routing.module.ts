import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexUsuarioComponent } from './components/usuarios/index/index-usuario.component';
import { VisualizarUsuarioComponent } from './components/usuarios/visualizar/visualizar-usuario.component';
import { CadastrarUsuarioComponent } from './components/usuarios/cadastrar/cadastrar-usuario.component';

const routes: Routes = [
  { path: 'usuarios', component: IndexUsuarioComponent },
  { path: 'usuarios/cadastrar', component: CadastrarUsuarioComponent },
  { path: 'usuarios/visualizar', component: VisualizarUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
