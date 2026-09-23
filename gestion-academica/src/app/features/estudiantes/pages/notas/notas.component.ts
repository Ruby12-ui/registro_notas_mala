import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Nota {
  id: number;
  curso: string;
  periodo: string;
  nota: number;
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
      periodo: 'Bimestre I',
      nota: 16
    },
    {
      id: 2,
      curso: 'Comunicación',
      periodo: 'Bimestre I',
      nota: 18
    },
    {
      id: 3,
      curso: 'Ciencia y Tecnología',
      periodo: 'Bimestre I',
      nota: 15
    },
    {
      id: 4,
      curso: 'Matemática',
      periodo: 'Bimestre II',
      nota: 17
    }
  ];

  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['/estudiante/dashboard']);
  }
}