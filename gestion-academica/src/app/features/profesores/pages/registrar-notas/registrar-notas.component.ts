import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface EstudianteNota {
  id: number;
  dni: string;
  nombre: string;
  nota: number | null;
}

@Component({
  selector: 'app-registrar-notas',
  standalone: true,
  imports: [],
  templateUrl: './registrar-notas.component.html',
  styleUrl: './registrar-notas.component.css'
})
export class RegistrarNotasComponent {

  cursoSeleccionado = 'Matemática';
  gradoSeleccionado = '5to';
  seccionSeleccionada = 'A';

  estudiantes: EstudianteNota[] = [
    {
      id: 1,
      dni: '74561234',
      nombre: 'Juan Pérez García',
      nota: 16
    },
    {
      id: 2,
      dni: '72345678',
      nombre: 'María López Torres',
      nota: 18
    },
    {
      id: 3,
      dni: '75678912',
      nombre: 'Carlos Ramírez Díaz',
      nota: 14
    },
    {
      id: 4,
      dni: '76891234',
      nombre: 'Pedro Sánchez López',
      nota: null
    }
  ];

  mensaje = '';

  constructor(private router: Router) {}

  guardarNotas(): void {
    this.mensaje = 'Las notas fueron guardadas correctamente.';

    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  volver(): void {
    this.router.navigate(['/profesor/dashboard']);
  }
}