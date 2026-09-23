import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface CursoProfesor {
  id: number;
  curso: string;
  grado: string;
  seccion: string;
  horas: number;
}

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [],
  templateUrl: './mis-cursos.component.html',
  styleUrl: './mis-cursos.component.css'
})
export class MisCursosComponent {

  cursos: CursoProfesor[] = [
    {
      id: 1,
      curso: 'Matemática',
      grado: '5to',
      seccion: 'A',
      horas: 5
    },
    {
      id: 2,
      curso: 'Comunicación',
      grado: '5to',
      seccion: 'A',
      horas: 4
    },
    {
      id: 3,
      curso: 'Ciencia y Tecnología',
      grado: '3ro',
      seccion: 'B',
      horas: 4
    }
  ];

  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['/profesor/dashboard']);
  }
}