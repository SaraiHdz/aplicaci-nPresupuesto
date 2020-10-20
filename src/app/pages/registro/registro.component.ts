import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioModels } from '../../models/usuario.models';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  usuario: UsuarioModels;
  constructor(private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.usuario = new UsuarioModels();
  }

  onSubmit(form: NgForm){
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

    this.auth.nuevoUsuario(this.usuario).subscribe( resp => {
      console.log(resp);
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'error',
        title: 'ERROR AL REGISTRASE ',
        text: err.error.error.message
      });
    });
  }

}
