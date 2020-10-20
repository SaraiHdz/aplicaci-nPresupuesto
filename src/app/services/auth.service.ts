import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModels } from '../models/usuario.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/';
  private apiKey = 'AIzaSyBAWxTXPRpYdMmIZL0IM0Bw1qQkCynUAqs';
  userToken: string;

  constructor( private http: HttpClient) { }

  

  login (usuario: UsuarioModels){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      token: true
    }
    return this.http.post(
      `${this.url}accounts:signInWithPassword?key=${this.apiKey}`, authData
    ).pipe( map( resp => {
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }

  nuevoUsuario(usuario: UsuarioModels){
    const authData = {
      email: usuario.email,
      password: usuario.password,
      tokens: true
    };

    return this.http.post(
      `${this.url}accounts:signUp?key=${this.apiKey}`, authData
    ).pipe(
      map( resp => {
        this.guardarToken(resp[ 'idToken' ]);
        return resp;
      })
    );
  }

  private guardarToken(idToken: string){
    this.userToken = idToken;
    localStorage.setItem('idToken', idToken);
  }

  private leerToken(){
    if(localStorage.getItem('idToken')){
      this.userToken = localStorage.getItem('idToken');
    } else {
      this.userToken = "";
    }
  }

  seguridad(): boolean{
    this.leerToken();
    return this.userToken.length > 2;
  }
}
