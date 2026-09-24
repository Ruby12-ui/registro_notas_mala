import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  AuthService
} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  usuario = '';

  password = '';

  mensaje = '';

  constructor(
    private authService: AuthService
  ) {}

  iniciarSesion(): void {

    this.mensaje = '';

    if (
      !this.usuario ||
      !this.password
    ) {

      this.mensaje =
        'Ingrese usuario y contraseña';

      return;
    }

    const correcto =
      this.authService.login(
        this.usuario,
        this.password
      );

    if (!correcto) {

      this.mensaje =
        'Usuario o contraseña incorrectos';

      return;
    }

    this.authService.irAlDashboard();

  }

}