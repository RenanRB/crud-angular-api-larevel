import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CadastrarUsuarioComponent } from './components/usuarios/cadastrar/cadastrar-usuario.component';
import { IndexUsuarioComponent } from './components/usuarios/index/index-usuario.component';
import { VisualizarUsuarioComponent } from './components/usuarios/visualizar/visualizar-usuario.component';
import { EditarUsuarioComponent } from './components/usuarios/editar/editar-usuario.component';
import { CadastrarEmpresaComponent } from './components/empresas/cadastrar/cadastrar-empresa.component';
import { IndexEmpresaComponent } from './components/empresas/index/index-empresa.component';
import { VisualizarEmpresaComponent } from './components/empresas/visualizar/visualizar-empresa.component';
import { EditarEmpresaComponent } from './components/empresas/editar/editar-empresa.component';

import { UsuariosService } from './services/usuarios.service';
import { EmpresasService } from './services/empresas.service';

import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarUsuarioComponent,
    IndexUsuarioComponent,
    VisualizarUsuarioComponent,
    EditarUsuarioComponent,
    CadastrarEmpresaComponent,
    IndexEmpresaComponent,
    VisualizarEmpresaComponent,
    EditarEmpresaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [UsuariosService, EmpresasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
