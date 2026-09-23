import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  AuthService
} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-estudiante-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private router: Router,

    private authService:
      AuthService
  ) {}

  irNotas(): void {

    this.router.navigate([
      '/estudiante/notas'
    ]);

  }

  irAsistencias(): void {

    this.router.navigate([
      '/estudiante/asistencias'
    ]);

  }

  cerrarSesion(): void {

    this.authService.logout();

  }

}