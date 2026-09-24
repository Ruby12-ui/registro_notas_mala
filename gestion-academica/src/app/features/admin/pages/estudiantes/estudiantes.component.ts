import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Estudiante {
  id: number;
  dni: string;
  nombre: string;
  grado: string;
  seccion: string;
  estado: string;
}

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent {

  estudiantes: Estudiante[] = [
    {
      id: 1,
      dni: '74561234',
      nombre: 'Juan Pérez García',
      grado: '5to',
      seccion: 'A',
      estado: 'Activo'
    },
    {
      id: 2,
      dni: '72345678',
      nombre: 'María López Torres',
      grado: '5to',
      seccion: 'A',
      estado: 'Activo'
    },
    {
      id: 3,
      dni: '75678912',
      nombre: 'Carlos Ramírez Díaz',
      grado: '4to',
      seccion: 'B',
      estado: 'Activo'
    }
  ];

  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}