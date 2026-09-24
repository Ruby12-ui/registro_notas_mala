import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

interface EstudianteAsistencia {
  id: number;
  nombre: string;
  estado: 'Presente' | 'Falta' | 'Tardanza';
}

@Component({
  selector: 'app-registrar-asistencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registrar-asistencia.component.html',
  styleUrl: './registrar-asistencia.component.css'
})
export class RegistrarAsistenciaComponent {

  curso = 'Matemática';
  grado = '5to de Secundaria';
  seccion = 'A';
  fecha = '23/09/2026';

  estudiantes: EstudianteAsistencia[] = [
    { id: 1, nombre: 'Ana Torres', estado: 'Presente' },
    { id: 2, nombre: 'María López', estado: 'Presente' },
    { id: 3, nombre: 'Carlos Pérez', estado: 'Falta' },
    { id: 4, nombre: 'Lucía Ramírez', estado: 'Presente' },
    { id: 5, nombre: 'Diego Mendoza', estado: 'Tardanza' }
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

  cambiarEstado(
    estudiante: EstudianteAsistencia,
    estado: 'Presente' | 'Falta' | 'Tardanza'
  ): void {
    estudiante.estado = estado;
  }

  cantidadPresentes(): number {
    return this.estudiantes.filter(
      e => e.estado === 'Presente'
    ).length;
  }

  cantidadFaltas(): number {
    return this.estudiantes.filter(
      e => e.estado === 'Falta'
    ).length;
  }

  cantidadTardanzas(): number {
    return this.estudiantes.filter(
      e => e.estado === 'Tardanza'
    ).length;
  }

  guardarAsistencia(): void {
    alert('La asistencia se guardó correctamente.');
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}