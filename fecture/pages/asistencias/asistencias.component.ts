import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Asistencia {
  id: number;
  curso: string;
  fecha: string;
  estado: string;
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
      curso: 'Matemática',
      fecha: '02/09/2026',
      estado: 'Presente'
    },
    {
      id: 2,
      curso: 'Comunicación',
      fecha: '03/09/2026',
      estado: 'Presente'
    },
    {
      id: 3,
      curso: 'Matemática',
      fecha: '09/09/2026',
      estado: 'Falta'
    },
    {
      id: 4,
      curso: 'Ciencia y Tecnología',
      fecha: '10/09/2026',
      estado: 'Tardanza'
    }
  ];

  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['/estudiante/dashboard']);
  }
}