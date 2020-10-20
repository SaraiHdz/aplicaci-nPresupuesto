import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DispositivoModel } from '../../models/dispositivo.models';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dispositivo: DispositivoModel;
  flg: boolean;
  constructor(private router: Router) {}

  ngOnInit(){
    this.dispositivo = new DispositivoModel();
    this.validar();
  }

  guardar(form: NgForm){
    this.validar();

    if (this.flg == true){
      this.eliminar();
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: 'Datos eliminados',
        text: 'Los datos del dispositivo han sido eliminados con éxito'
      });
      this.flg = false;
    } else {
      localStorage.setItem('marca', this.dispositivo.marca);
      localStorage.setItem('modelo', this.dispositivo.modelo);
      localStorage.setItem('procesador', this.dispositivo.procesador);
      localStorage.setItem('pantalla', this.dispositivo.pantalla.toString());
      localStorage.setItem('numCamara', this.dispositivo.numCamara.toString());
      localStorage.setItem('ram', this.dispositivo.ram.toString());
      localStorage.setItem('almacenamiento', this.dispositivo.almacenamiento.toString());
      Swal.fire({
        allowOutsideClick: false,
        icon: 'success',
        title: 'Datos guardados',
        text: 'La información del dispositivo fue guardado con éxito'
      });
      localStorage.setItem('bandera', '1');
      this.flg = true;
    }
  }

  private validar(){
    if (localStorage.getItem('bandera')=="1"){
      this.flg = true;
    } else {
      this.flg = false;
    }
  }

  private eliminar() {
    localStorage.removeItem('marca')
    localStorage.removeItem('modelo');
    localStorage.removeItem('procesador');
    localStorage.removeItem('pantalla');
    localStorage.removeItem('numCamara');
    localStorage.removeItem('ram');
    localStorage.removeItem('almacenamiento');
    localStorage.removeItem('bandera');
  }

  cerrar(){
    localStorage.removeItem('idToken');
    this.router.navigateByUrl('/login');
  }
}
