import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotifierService } from 'angular-notifier';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Empresa } from 'src/app/models/empresa.model';

@Component({
  selector: 'app-visualizar-empresa',
  templateUrl: './visualizar-empresa.component.html',
  styleUrls: ['./visualizar-empresa.component.css']
})

export class VisualizarEmpresaComponent implements OnInit {

  empresa: Empresa;
  private readonly notifier: NotifierService;

  constructor(private empresasService: EmpresasService,
              private ar: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private notifierService: NotifierService) {
    this.ar.params.subscribe(
      params => this.empresasService.get(params.id).subscribe(
        data => this.empresa = data,
        (error) => {
          this.notifier.notify( 'error', error.error.message );
          this.spinner.hide();
        },
        () => this.spinner.hide()
      )
    );
  }

  ngOnInit() {
    this.spinner.show();
  }

}
