import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  id: number;

  constructor(private fb: FormBuilder,
              private usuariosService: UsuariosService,
              private router: Router,
              private ar: ActivatedRoute) {
    this.ar.params.subscribe( params => {
      this.id = params.id;
      this.usuariosService.get(this.id).subscribe( data => {
        this.usuarioForm.controls.nome.setValue(data.nome);
        this.usuarioForm.controls.cpf.setValue(data.cpf);
        this.usuarioForm.controls.email.setValue(data.email);
        this.usuarioForm.controls.login.setValue(data.login);
        this.usuarioForm.controls.endereco.setValue(data.endereco);
      });
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(80)]],
      cpf: ['', [Validators.required, Validators.minLength(11),  Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(3),  Validators.maxLength(80)] ],
      login: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(12)] ],
      password: ['', [Validators.required, Validators.maxLength(32)] ],
      endereco: ['', Validators.required ]
   });
  }

  enviarFormulario() {
    this.usuariosService.editar(this.id, this.usuarioForm.value)
    .subscribe(data => {
      this.router.navigate(['usuarios/']);
    });
  }
}
