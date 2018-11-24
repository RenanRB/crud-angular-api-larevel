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

import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'top',
      distance: 12,
      gap: 10
    }
  },
  behaviour: {
    autoHide: 3000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

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
    NgxMaskModule.forRoot(),
    NgxSpinnerModule,
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [UsuariosService, EmpresasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
