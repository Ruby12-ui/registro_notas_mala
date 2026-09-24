import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Asistencia {
  id: number;
  fecha: string;
  curso: string;
  estado: 'Presente' | 'Falta' | 'Tardanza';
}

@Component({
  selector: 'app-asistencias',
  standalone: true,
  imports: [],
  templateUrl: './asistencias.component.html',
  styleUrl: './asistencias.component.css'
})
export class AsistenciasComponent {

  asistencias: Asistencia[] = [
    {
      id: 1,
      fecha: '02/09/2026',
      curso: 'Matemática',
      estado: 'Presente'
    },
    {
      id: 2,
      fecha: '03/09/2026',
      curso: 'Comunicación',
      estado: 'Presente'
    },
    {
      id: 3,
      fecha: '04/09/2026',
      curso: 'Ciencia y Tecnología',
      estado: 'Tardanza'
    },
    {
      id: 4,
      fecha: '07/09/2026',
      curso: 'Matemática',
      estado: 'Falta'
    },
    {
      id: 5,
      fecha: '08/09/2026',
      curso: 'Comunicación',
      estado: 'Presente'
    },
    {
      id: 6,
      fecha: '09/09/2026',
      curso: 'Historia',
      estado: 'Presente'
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

  cantidadPresentes(): number {
    return this.asistencias.filter(
      asistencia => asistencia.estado === 'Presente'
    ).length;
  }

  cantidadFaltas(): number {
    return this.asistencias.filter(
      asistencia => asistencia.estado === 'Falta'
    ).length;
  }

  cantidadTardanzas(): number {
    return this.asistencias.filter(
      asistencia => asistencia.estado === 'Tardanza'
    ).length;
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');

    this.router.navigate([
      '/login'
    ]);
  }

}