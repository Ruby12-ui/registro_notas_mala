import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  AuthService
} from '../../../auth/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
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

  irEstudiantes(): void {

    this.router.navigate([
      '/admin/estudiantes'
    ]);

  }

  irProfesores(): void {

    this.router.navigate([
      '/admin/profesores'
    ]);

  }

  irCursos(): void {

    this.router.navigate([
      '/admin/cursos'
    ]);

  }

  irPeriodos(): void {

    this.router.navigate([
      '/admin/periodos'
    ]);

  }

  cerrarSesion(): void {

    this.authService.logout();

  }

}