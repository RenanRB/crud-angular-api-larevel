import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { EmpresasService } from '../../../services/empresas.service';
import { Empresa } from '../../../models/empresa.model';

@Component({
  selector: 'app-index-empresa',
  templateUrl: './index-empresa.component.html',
  styleUrls: ['./index-empresa.component.css']
})

export class IndexEmpresaComponent implements OnInit {

  empresas: Empresa[];
  private readonly notifier: NotifierService;

  constructor(private empresasService: EmpresasService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.spinner.show();
    this.empresasService.index().subscribe(
      data => this.empresas = data,
      (error) => {
        this.notifier.notify( 'error', error.error.message );
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  exluir(empresa: Empresa) {
    this.spinner.show();
    this.empresasService.excluir(empresa.id).subscribe(
      (data: any) => {
        // Após o servidor remover a empresa é removido também do array de empresas
        const index = this.empresas.indexOf(empresa);
        this.empresas.splice(index, 1);
        this.notifier.notify( 'success', data.message );
      },
      (error) => {
        this.notifier.notify( 'error', error.error.message );
        this.spinner.hide();
      },
      () => this.spinner.hide()
    );
  }

  // Envia para a página de edição
  editar(empresa: Empresa) {
    this.router.navigate(['empresas/editar/' + empresa.id]);
  }

  // Enviap para a página de visualização
  visualizar(empresa: Empresa) {
    this.router.navigate(['empresas/visualizar/' + empresa.id]);
  }

}
