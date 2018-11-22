import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get<Usuario[]>('/server/api/usuarios/');
  }

  cadastrar(form: Usuario) {
    return this.http.post('/server/api/usuarios/', form);
  }

  excluir(id: number) {
    return this.http.delete('/server/api/usuarios/' + id);
  }
}
