import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-index-usuario',
  templateUrl: './index-usuario.component.html',
  styleUrls: ['./index-usuario.component.css']
})
export class IndexUsuarioComponent implements OnInit {

  usuarios: Usuario[];
  private readonly notifier: NotifierService;

  constructor(private usuariosService: UsuariosService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.spinner.show();
    this.usuariosService.index().subscribe(
      data => this.usuarios = data,
      (error) => {
        this.notifier.notify( 'error', error.error.message );
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  // Exclui o usuário
  exluirUsuario(usuario: Usuario) {
    this.spinner.show();
    this.usuariosService.excluir(usuario.id).subscribe(
      (data: any) => {
        // Após a exclusão ter sucesso do lado do servidor é removido do array de exibição
        const index = this.usuarios.indexOf(usuario);
        this.usuarios.splice(index, 1);
        this.notifier.notify( 'success', data.message );
      },
      (error) => {
        this.notifier.notify( 'error', error.error.message );
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  // Envia para a página de edição
  editarUsuario(usuario: Usuario) {
    this.router.navigate(['usuarios/editar/' + usuario.id]);
  }

  // Envia para a página de visualização
  visualizarUsuario(usuario: Usuario) {
    this.router.navigate(['usuarios/visualizar/' + usuario.id]);
  }

}
