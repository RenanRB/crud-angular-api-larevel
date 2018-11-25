import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-visualizar-usuario',
  templateUrl: './visualizar-usuario.component.html',
  styleUrls: ['./visualizar-usuario.component.css']
})
export class VisualizarUsuarioComponent implements OnInit {

  usuario: Usuario;
  private readonly notifier: NotifierService;

  constructor(private usuariosService: UsuariosService,
              private ar: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private notifierService: NotifierService) {
    this.ar.params.subscribe(
      params => this.usuariosService.get(params.id).subscribe(
        data => this.usuario = data,
        (error) => {
          this.notifier.notify( 'error', error.error.message );
          this.spinner.hide();
        },
        () => this.spinner.hide()
      )
    );
  }

  ngOnInit() {
    this.spinner.show();
  }

}
