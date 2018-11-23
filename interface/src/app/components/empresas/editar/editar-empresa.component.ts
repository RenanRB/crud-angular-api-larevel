import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmpresasService } from '../../../services/empresas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})

export class EditarEmpresaComponent implements OnInit {

  empresaForm: FormGroup;
  id: number;

  constructor(private fb: FormBuilder,
              private empresasService: EmpresasService,
              private router: Router,
              private ar: ActivatedRoute) {
    this.ar.params.subscribe( params => {
      this.id = params.id;
      this.empresasService.get(this.id).subscribe( data => {
        this.empresaForm.controls.nome.setValue(data.nome);
        this.empresaForm.controls.cnpj.setValue(data.cnpj);
        this.empresaForm.controls.endereco.setValue(data.endereco);
      });
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.empresaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(80)]],
      cnpj: ['', [Validators.required, Validators.minLength(14),  Validators.maxLength(14)]],
      endereco: ['', Validators.required ]
   });
  }

  enviarFormulario() {
    this.empresasService.editar(this.id, this.empresaForm.value)
    .subscribe(data => {
      this.router.navigate(['empresas/']);
    });
  }
}
