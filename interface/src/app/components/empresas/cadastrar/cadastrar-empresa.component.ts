import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmpresasService } from '../../../services/empresas.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cadastrar-empresa',
  templateUrl: './cadastrar-empresa.component.html',
  styleUrls: ['./cadastrar-empresa.component.css']
})

export class CadastrarEmpresaComponent implements OnInit {

  empresaForm: FormGroup;

  constructor(private fb: FormBuilder,
              private empresasService: EmpresasService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.empresaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(80)]],
      cnpj: ['', [Validators.required, Validators.minLength(14),  Validators.maxLength(14)]],
      endereco: ['', Validators.required ]
   });
  }

  enviarFormulario() {
    this.empresasService.cadastrar(this.empresaForm.value)
    .subscribe(data => {
      this.router.navigate(['empresas/']);
    });
  }
}
