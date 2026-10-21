import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

interface Estudiante {
  id: number;
  nombre: string;
  nota: number;
}

@Component({
  selector: 'app-registrar-notas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registrar-notas.component.html',
  styleUrl: './registrar-notas.component.css'
})
export class RegistrarNotasComponent {

  curso = 'Matemática';
  grado = '5to de Secundaria';
  seccion = 'A';
  periodo = 'Bimestre I';

  estudiantes: Estudiante[] = [
    { id: 1, nombre: 'Ana Torres', nota: 16 },
    { id: 2, nombre: 'María López', nota: 18 },
    { id: 3, nombre: 'Carlos Pérez', nota: 10 },
    { id: 4, nombre: 'Lucía Ramírez', nota: 17 },
    { id: 5, nombre: 'Diego Mendoza', nota: 14 }
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

  actualizarNota(estudiante: Estudiante, evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const nuevaNota = Number(input.value);

    if (nuevaNota >= 0 && nuevaNota <= 20) {
      estudiante.nota = nuevaNota;
    }
  }

  guardarNotas(): void {
    alert('Las calificaciones se guardaron correctamente.');
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}