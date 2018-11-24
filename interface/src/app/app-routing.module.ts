import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexUsuarioComponent } from './components/usuarios/index/index-usuario.component';
import { VisualizarUsuarioComponent } from './components/usuarios/visualizar/visualizar-usuario.component';
import { CadastrarUsuarioComponent } from './components/usuarios/cadastrar/cadastrar-usuario.component';
import { EditarUsuarioComponent } from './components/usuarios/editar/editar-usuario.component';
import { EditarEmpresaComponent } from './components/empresas/editar/editar-empresa.component';
import { VisualizarEmpresaComponent } from './components/empresas/visualizar/visualizar-empresa.component';
import { CadastrarEmpresaComponent } from './components/empresas/cadastrar/cadastrar-empresa.component';
import { IndexEmpresaComponent } from './components/empresas/index/index-empresa.component';

const routes: Routes = [
  { path: '', redirectTo: 'empresas', pathMatch: 'full' },
  { path: 'usuarios', component: IndexUsuarioComponent },
  { path: 'usuarios/cadastrar', component: CadastrarUsuarioComponent },
  { path: 'usuarios/visualizar/:id', component: VisualizarUsuarioComponent },
  { path: 'usuarios/editar/:id', component: EditarUsuarioComponent },
  { path: 'empresas', component: IndexEmpresaComponent },
  { path: 'empresas/cadastrar', component: CadastrarEmpresaComponent },
  { path: 'empresas/visualizar/:id', component: VisualizarEmpresaComponent },
  { path: 'empresas/editar/:id', component: EditarEmpresaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
