import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  api = '/server/api/usuarios/';

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get<Usuario[]>(this.api);
  }

  get(id) {
    return this.http.get<Usuario>(this.api + id);
  }

  cadastrar(form: Usuario) {
    return this.http.post(this.api, form);
  }

  editar(id: number, form: Usuario) {
    return this.http.put(this.api + id, form);
  }

  excluir(id: number) {
    return this.http.delete(this.api + id);
  }
}
