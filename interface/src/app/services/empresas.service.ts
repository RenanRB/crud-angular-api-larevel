import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})

export class EmpresasService {

  api = '/server/api/empresas/';

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get<Empresa[]>(this.api);
  }

  get(id) {
    return this.http.get<Empresa>(this.api + id);
  }

  cadastrar(form: Empresa) {
    return this.http.post(this.api, form);
  }

  editar(id: number, form: Empresa) {
    return this.http.put(this.api + id, form);
  }

  excluir(id: number) {
    return this.http.delete(this.api + id);
  }
}
