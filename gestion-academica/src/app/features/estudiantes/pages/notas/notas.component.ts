import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Nota {
  id: number;
  curso: string;
  docente: string;
  bimestre1: number;
  bimestre2: number;
  promedio: number;
}

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})
export class NotasComponent {

  notas: Nota[] = [
    {
      id: 1,
      curso: 'Matemática',
      docente: 'Carlos Mendoza',
      bimestre1: 16,
      bimestre2: 17,
      promedio: 16.5
    },
    {
      id: 2,
      curso: 'Comunicación',
      docente: 'Ana García',
      bimestre1: 18,
      bimestre2: 17,
      promedio: 17.5
    },
    {
      id: 3,
      curso: 'Ciencia y Tecnología',
      docente: 'Luis Ramírez',
      bimestre1: 14,
      bimestre2: 15,
      promedio: 14.5
    },
    {
      id: 4,
      curso: 'Historia',
      docente: 'María López',
      bimestre1: 15,
      bimestre2: 16,
      promedio: 15.5
    },
    {
      id: 5,
      curso: 'Inglés',
      docente: 'Pedro Torres',
      bimestre1: 13,
      bimestre2: 14,
      promedio: 13.5
    }
  ];

  constructor(
    private router: Router
  ) {}

  irDashboard(): void {
    this.router.navigate([
      '/estudiante/dashboard'
    ]);
  }

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

  irPerfil(): void {
    this.router.navigate([
      '/estudiante/mi-perfil'
    ]);
  }

  cantidadAprobados(): number {
    return this.notas.filter(
      nota => nota.promedio >= 11
    ).length;
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');

    this.router.navigate([
      '/login'
    ]);
  }

}