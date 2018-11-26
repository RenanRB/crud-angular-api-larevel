import { Usuario } from 'src/app/models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { UsuariosService } from './../../../services/usuarios.service';
import { EmpresasService } from '../../../services/empresas.service';

@Component({
  selector: 'app-cadastrar-empresa',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css']
})

export class CadastrarEmpresaComponent implements OnInit {

  empresaForm: FormGroup;
  usuarios: Usuario[];
  private readonly notifier: NotifierService;

  constructor(private fb: FormBuilder,
              private empresasService: EmpresasService,
              private usuariosService: UsuariosService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private notifierService: NotifierService) {
    this.notifier = notifierService;

    this.usuariosService.index().subscribe(
      data => this.usuarios = data,
      (error) => {
        this.notifier.notify( 'error', error.error.message );
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

    this.createForm();
  }

  ngOnInit() {}

  // Validação de formulário
  createForm() {
    this.empresaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(80)]],
      cnpj: ['', [Validators.required, Validators.minLength(14),  Validators.maxLength(14)]],
      endereco: ['', Validators.required ],
      usuarios: [''],
   });
  }

  enviarFormulario() {
    // exibe spinner de carregamento
    this.spinner.show();
    this.empresasService.cadastrar(this.empresaForm.value)
    .subscribe(
      (data: any) => {
        this.router.navigate(['empresas/']);
        this.notifier.notify( 'success', data.message );
      },
      (error) => {
        this.notifier.notify( 'error', error.error.message );
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
}
