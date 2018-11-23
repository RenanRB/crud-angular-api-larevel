import { Component, OnInit } from '@angular/core';
import { EmpresasService } from 'src/app/services/empresas.service';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/models/empresa.model';

@Component({
  selector: 'app-visualizar-empresa',
  templateUrl: './visualizar-empresa.component.html',
  styleUrls: ['./visualizar-empresa.component.css']
})

export class VisualizarEmpresaComponent implements OnInit {

  empresa: Empresa;
  constructor(private empresasService: EmpresasService,
              private ar: ActivatedRoute) {
    this.ar.params.subscribe( params => {
      this.empresasService.get(params.id).subscribe( data => {
        this.empresa = data;
      });
    });
  }

  ngOnInit() {
  }

}
