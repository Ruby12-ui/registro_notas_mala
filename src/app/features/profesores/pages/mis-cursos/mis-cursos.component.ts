import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

interface Curso {
  id: number;
  nombre: string;
  grado: string;
  seccion: string;
  horario: string;
  estudiantes: number;
}

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [],
  templateUrl: './mis-cursos.component.html',
  styleUrl: './mis-cursos.component.css'
})
export class MisCursosComponent {

  cursos: Curso[] = [
    {
      id: 1,
      nombre: 'Matemática',
      grado: '5to de Secundaria',
      seccion: 'A',
      horario: 'Lunes y Miércoles - 8:00 a.m.',
      estudiantes: 28
    },
    {
      id: 2,
      nombre: 'Comunicación',
      grado: '4to de Secundaria',
      seccion: 'A',
      horario: 'Martes y Jueves - 10:00 a.m.',
      estudiantes: 25
    },
    {
      id: 3,
      nombre: 'Matemática',
      grado: '4to de Secundaria',
      seccion: 'B',
      horario: 'Viernes - 8:00 a.m.',
      estudiantes: 27
    }
  ];

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