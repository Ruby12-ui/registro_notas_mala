import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  Rol,
  Usuario
} from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarios = [

    {
      usuario: 'admin',
      password: 'admin123',
      nombre: 'Administrador',
      rol: 'ADMIN' as Rol
    },

    {
      usuario: 'profesor',
      password: 'profesor123',
      nombre: 'Profesor Demo',
      rol: 'PROFESOR' as Rol
    },

    {
      usuario: 'estudiante',
      password: 'estudiante123',
      nombre: 'Estudiante Demo',
      rol: 'ESTUDIANTE' as Rol
    }

  ];

  constructor(
    private router: Router
  ) {}

  login(
    usuario: string,
    password: string
  ): boolean {

    const encontrado =
      this.usuarios.find(
        u =>
          u.usuario === usuario &&
          u.password === password
      );

    if (!encontrado) {
      return false;
    }

    const usuarioSesion: Usuario = {

      usuario: encontrado.usuario,

      nombre: encontrado.nombre,

      rol: encontrado.rol

    };

    localStorage.setItem(
      'usuario',
      JSON.stringify(usuarioSesion)
    );

    return true;
  }

  logout(): void {

    localStorage.removeItem(
      'usuario'
    );

    this.router.navigate([
      '/login'
    ]);
  }

  obtenerUsuario(): Usuario | null {

    const datos =
      localStorage.getItem('usuario');

    if (!datos) {
      return null;
    }

    return JSON.parse(datos);
  }

  estaAutenticado(): boolean {

    return this.obtenerUsuario() !== null;

  }

  tieneRol(
    rol: Rol
  ): boolean {

    const usuario =
      this.obtenerUsuario();

    return usuario?.rol === rol;
  }

  irAlDashboard(): void {

    const usuario =
      this.obtenerUsuario();

    if (!usuario) {

      this.router.navigate([
        '/login'
      ]);

      return;
    }

    switch (usuario.rol) {

      case 'ADMIN':

        this.router.navigate([
          '/admin/dashboard'
        ]);

        break;

      case 'PROFESOR':

        this.router.navigate([
          '/profesor/dashboard'
        ]);

        break;

      case 'ESTUDIANTE':

        this.router.navigate([
          '/estudiante/dashboard'
        ]);

        break;

    }

  }

}