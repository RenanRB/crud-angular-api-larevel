import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CadastrarUsuarioComponent } from './components/usuarios/cadastrar/cadastrar-usuario.component';
import { IndexUsuarioComponent } from './components/usuarios/index/index-usuario.component';
import { VisualizarUsuarioComponent } from './components/usuarios/visualizar/visualizar-usuario.component';

import { UsuariosService } from './services/usuarios.service';

@NgModule({
  declarations: [
    AppComponent,
    CadastrarUsuarioComponent,
    IndexUsuarioComponent,
    VisualizarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [UsuariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
