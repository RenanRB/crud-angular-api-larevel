import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-index-usuario',
  templateUrl: './index-usuario.component.html',
  styleUrls: ['./index-usuario.component.css']
})
export class IndexUsuarioComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private usuariosService: UsuariosService) {

  }

  ngOnInit() {
    this.usuariosService.index().subscribe(data => {
      this.usuarios = data;
      console.log(this.usuarios);
    });
  }

  exluirUsuario(id) {
    this.usuariosService.excluir(id).subscribe(data => {
      console.log(data);
    });
  }

}
