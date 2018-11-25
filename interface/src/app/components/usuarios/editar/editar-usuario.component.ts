import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Empresa } from 'src/app/models/empresa.model';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  id: number;
  empresas: Empresa[];
  private readonly notifier: NotifierService;

  constructor(private fb: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router,
              private ar: ActivatedRoute,
              private empresasService: EmpresasService,
              private spinner: NgxSpinnerService,
              private notifierService: NotifierService) {
    this.notifier = notifierService;

    this.empresasService.index().subscribe(
      data => this.empresas = data,
      (error) => {
        this.notifier.notify( 'error', error.error.message );
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

    this.ar.params.subscribe( params => {
      this.id = params.id;
      this.usuariosService.get(this.id).subscribe(
        data => {
          this.usuarioForm.controls.nome.setValue(data.nome);
          this.usuarioForm.controls.cpf.setValue(data.cpf);
          this.usuarioForm.controls.email.setValue(data.email);
          this.usuarioForm.controls.login.setValue(data.login);
          this.usuarioForm.controls.endereco.setValue(data.endereco);
          this.usuarioForm.controls.empresas.setValue(data.empresas.map((a: any) => a.id));
        },
        (error) => {
          this.notifier.notify( 'error', error.error.message );
          this.spinner.hide();
        },
        () => this.spinner.hide()
      );
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.createForm();
  }

  createForm() {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(80)]],
      cpf: ['', [Validators.required, Validators.minLength(11),  Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3),  Validators.maxLength(80)] ],
      login: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(12)] ],
      password: ['', [Validators.minLength(3), Validators.maxLength(32)] ],
      endereco: ['', Validators.required ],
      empresas: [''],
   });
  }

  enviarFormulario() {
    this.spinner.show();
    this.usuariosService.editar(this.id, this.usuarioForm.value)
    .subscribe(
      (data: any) => {
        this.router.navigate(['usuarios/']);
        this.notifier.notify( 'success', data.success );
      },
      (error) => {
        this.notifier.notify( 'error', error.error.message );
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }
}
