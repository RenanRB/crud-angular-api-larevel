import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
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

  constructor(private fb: FormBuilder,
              private router: Router,
              private usuariosService: UsuariosService,
              private empresasService: EmpresasService) {

    this.empresasService.index().subscribe(data => {
      this.empresas = data;
    });
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(80)]],
      cpf: ['', [Validators.required, Validators.minLength(11),  Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3),  Validators.maxLength(80)] ],
      login: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(12)] ],
      password: ['', [Validators.required, Validators.maxLength(32)] ],
      endereco: ['', Validators.required ],
      empresas: [''],
   });
  }

  enviarFormulario() {
    this.usuariosService.cadastrar(this.usuarioForm.value)
    .subscribe(data => {
      this.router.navigate(['usuarios/']);
    });
  }
}
