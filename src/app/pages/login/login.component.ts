import { Component, OnInit } from '@angular/core';
import { UsuarioModels } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModels;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModels();
  }

  onSubmit(form: NgForm) {
    /* if ( form.invalid ){
       return;
    } */
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'CARGANDO.....',
      timer: 1000,
      text: 'Espere por favor',
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: false
    });
    Swal.showLoading();
    this.auth.login(this.usuario).subscribe(resp => {
      console.log(resp);
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'ERROR AL AUTENTICAR',
        text: err.error.error.message
      });
    });
   /*  console.log('Formulario enviado');
    console.log(this.usuario);
    console.log(form); */
  }
}
