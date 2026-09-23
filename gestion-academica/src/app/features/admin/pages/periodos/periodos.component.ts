import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Periodo {
  id: number;
  anio: number;
  nombre: string;
  inicio: string;
  fin: string;
  estado: string;
}

@Component({
  selector: 'app-periodos',
  standalone: true,
  imports: [],
  templateUrl: './periodos.component.html',
  styleUrl: './periodos.component.css'
})
export class PeriodosComponent {

  periodos: Periodo[] = [
    {
      id: 1,
      anio: 2026,
      nombre: 'Año Académico 2026',
      inicio: '02/03/2026',
      fin: '18/12/2026',
      estado: 'Activo'
    },
    {
      id: 2,
      anio: 2025,
      nombre: 'Año Académico 2025',
      inicio: '03/03/2025',
      fin: '19/12/2025',
      estado: 'Finalizado'
    }
  ];

  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}