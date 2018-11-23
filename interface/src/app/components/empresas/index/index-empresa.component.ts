import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../../services/empresas.service';
import { Empresa } from '../../../models/empresa.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-empresa',
  templateUrl: './index-empresa.component.html',
  styleUrls: ['./index-empresa.component.css']
})

export class IndexEmpresaComponent implements OnInit {

  empresas: Empresa[];

  constructor(private empresasService: EmpresasService,
              private router: Router) {

  }

  ngOnInit() {
    this.empresasService.index().subscribe(data => {
      this.empresas = data;
      console.log(this.empresas);
    });
  }

  exluir(empresa: Empresa) {
    this.empresasService.excluir(empresa.id).subscribe(data => {
      const index = this.empresas.indexOf(empresa);
      this.empresas.splice(index, 1);
    });
  }

  editar(empresa: Empresa) {
    this.router.navigate(['empresas/editar/' + empresa.id]);
  }

  visualizar(empresa: Empresa) {
    this.router.navigate(['empresas/visualizar/' + empresa.id]);
  }

}
