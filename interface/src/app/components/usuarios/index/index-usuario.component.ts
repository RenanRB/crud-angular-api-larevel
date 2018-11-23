import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-usuario',
  templateUrl: './index-usuario.component.html',
  styleUrls: ['./index-usuario.component.css']
})
export class IndexUsuarioComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private usuariosService: UsuariosService,
              private router: Router) {

  }

  ngOnInit() {
    this.usuariosService.index().subscribe(data => {
      this.usuarios = data;
      console.log(this.usuarios);
    });
  }

  exluirUsuario(usuario: Usuario) {
    this.usuariosService.excluir(usuario.id).subscribe(data => {
      const index = this.usuarios.indexOf(usuario);
      this.usuarios.splice(index, 1);
    });
  }

  editarUsuario(usuario: Usuario) {
    this.router.navigate(['usuarios/editar/' + usuario.id]);
  }

  visualizarUsuario(usuario: Usuario) {
    this.router.navigate(['usuarios/visualizar/' + usuario.id]);
  }

}
