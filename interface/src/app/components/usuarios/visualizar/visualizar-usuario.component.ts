import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-visualizar-usuario',
  templateUrl: './visualizar-usuario.component.html',
  styleUrls: ['./visualizar-usuario.component.css']
})
export class VisualizarUsuarioComponent implements OnInit {

  usuario: Usuario;
  constructor(private usuariosService: UsuariosService,
              private ar: ActivatedRoute) {
    this.ar.params.subscribe( params => {
      this.usuariosService.get(params.id).subscribe( data => {
        this.usuario = data;
      });
    });
  }

  ngOnInit() {
  }

}
