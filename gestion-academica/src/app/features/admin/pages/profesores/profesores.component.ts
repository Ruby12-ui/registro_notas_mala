import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Profesor {
  id: number;
  dni: string;
  nombre: string;
  especialidad: string;
  estado: string;
}

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [],
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css'
})
export class ProfesoresComponent {

  profesores: Profesor[] = [
    {
      id: 1,
      dni: '45678912',
      nombre: 'Carlos Mendoza López',
      especialidad: 'Matemática',
      estado: 'Activo'
    },
    {
      id: 2,
      dni: '47891236',
      nombre: 'Ana Torres García',
      especialidad: 'Comunicación',
      estado: 'Activo'
    },
    {
      id: 3,
      dni: '41236789',
      nombre: 'Luis Ramírez Pérez',
      especialidad: 'Ciencia y Tecnología',
      estado: 'Activo'
    }
  ];

  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}