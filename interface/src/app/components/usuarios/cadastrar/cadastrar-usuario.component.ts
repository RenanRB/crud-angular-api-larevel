import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { UsuariosService } from '../../../services/usuarios.service';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Empresa } from './../../../models/empresa.model';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  empresas: Empresa[];
  private readonly notifier: NotifierService;

  constructor(private fb: FormBuilder,
              private router: Router,
              private usuariosService: UsuariosService,
              private empresasService: EmpresasService,
              private spinner: NgxSpinnerService,
              private notifierService: NotifierService) {
    this.notifier = notifierService;

    // Carrega as empresas
    this.empresasService.index().subscribe(
      data => this.empresas = data,
      (error) => {
        this.notifier.notify( 'error', error.error.message );
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
    this.createForm();
  }

  ngOnInit() {
    // Coloca o spinner enquanto carrega os dados da página
    this.spinner.show();
  }

  // Valida o formulário
  createForm() {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(80)]],
      cpf: ['', [Validators.required, Validators.minLength(11),  Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3),  Validators.maxLength(80)] ],
      login: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(12)] ],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)] ],
      endereco: ['', Validators.required ],
      empresas: [''],
   });
  }

  enviarFormulario() {
    this.spinner.show();
    this.usuariosService.cadastrar(this.usuarioForm.value)
    .subscribe(
      (data: any) => {
        this.router.navigate(['usuarios/']);
        this.notifier.notify( 'success', data.message );
        this.spinner.hide();
      },
      (error) => {
        this.notifier.notify( 'error', error.error.message );
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
}
