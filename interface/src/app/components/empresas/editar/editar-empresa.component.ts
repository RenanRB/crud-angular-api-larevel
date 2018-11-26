import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { EmpresasService } from '../../../services/empresas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})

export class EditarEmpresaComponent implements OnInit {

  empresaForm: FormGroup;
  id: number;
  usuarios: Usuario[];
  private readonly notifier: NotifierService;

  constructor(private fb: FormBuilder,
              private empresasService: EmpresasService,
              private usuariosService: UsuariosService,
              private router: Router,
              private ar: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private notifierService: NotifierService) {
    this.notifier = notifierService;

    // carrega usuários
    this.usuariosService.index().subscribe(
      data => this.usuarios = data,
      (error) => {
        this.notifier.notify( 'error', error.error.message );
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );

    // Pega o parâmetro do id da empresa
    this.ar.params.subscribe( params => {
      this.id = params.id;
      this.empresasService.get(this.id).subscribe(
        data => {
          // Atualiza o valor dos campos com o retorno do servidor
          this.empresaForm.controls.nome.setValue(data.nome);
          this.empresaForm.controls.cnpj.setValue(data.cnpj);
          this.empresaForm.controls.endereco.setValue(data.endereco);
          this.empresaForm.controls.usuarios.setValue(data.usuarios.map((a: any) => a.id));
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

  // Validação dos campos
  createForm() {
    this.empresaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(80)]],
      cnpj: ['', [Validators.required, Validators.minLength(14),  Validators.maxLength(14)]],
      endereco: ['', Validators.required ],
      usuarios: [''],
   });
  }

  enviarFormulario() {
    this.spinner.show();
    this.empresasService.editar(this.id, this.empresaForm.value)
    .subscribe(
      (data: any) => {
        this.router.navigate(['empresas/']);
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
