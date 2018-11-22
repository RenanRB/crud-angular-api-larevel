import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.component.html',
  styleUrls: ['./cadastrar-usuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required ],
      cpf: ['', Validators.required ],
      email: ['', Validators.required ],
      login: ['', Validators.required ],
      senha: ['', Validators.required ],
      endereco: ['', Validators.required ]
   });
  }

  enviarFormulario() {
    this.usuariosService.cadastrar(this.usuarioForm.value)
    .subscribe(data => {
      this.router.navigate(['usuarios/']);
    });
  }
}
