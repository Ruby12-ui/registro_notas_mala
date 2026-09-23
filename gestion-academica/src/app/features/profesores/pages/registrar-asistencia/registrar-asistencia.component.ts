import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface EstudianteAsistencia {
  id: number;
  dni: string;
  nombre: string;
  asistencia: string;
}

@Component({
  selector: 'app-registrar-asistencia',
  standalone: true,
  imports: [],
  templateUrl: './registrar-asistencia.component.html',
  styleUrl: './registrar-asistencia.component.css'
})
export class RegistrarAsistenciaComponent {

  fecha = '23/09/2026';

  estudiantes: EstudianteAsistencia[] = [
    {
      id: 1,
      dni: '74561234',
      nombre: 'Juan Pérez García',
      asistencia: 'Presente'
    },
    {
      id: 2,
      dni: '72345678',
      nombre: 'María López Torres',
      asistencia: 'Presente'
    },
    {
      id: 3,
      dni: '75678912',
      nombre: 'Carlos Ramírez Díaz',
      asistencia: 'Falta'
    },
    {
      id: 4,
      dni: '76891234',
      nombre: 'Pedro Sánchez López',
      asistencia: 'Tardanza'
    }
  ];

  mensaje = '';

  constructor(private router: Router) {}

  guardarAsistencia(): void {
    this.mensaje = 'La asistencia fue registrada correctamente.';

    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  volver(): void {
    this.router.navigate(['/profesor/dashboard']);
  }
}