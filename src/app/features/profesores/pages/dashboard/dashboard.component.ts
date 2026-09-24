import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-profesor-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  irDashboard(): void {
    this.router.navigate(['/profesor/dashboard']);
  }

  irCursos(): void {
    this.router.navigate(['/profesor/mis-cursos']);
  }

  irNotas(): void {
    this.router.navigate(['/profesor/registrar-notas']);
  }

  irAsistencia(): void {
    this.router.navigate(['/profesor/registrar-asistencia']);
  }

  irPerfil(): void {
    this.router.navigate(['/profesor/mi-perfil']);
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}