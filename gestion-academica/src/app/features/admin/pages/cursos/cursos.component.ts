import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  CursosService
} from '../../services/cursos.service';

import {
  Curso
} from '../../interfaces/curso.interface';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {

  cursos: Curso[] = [];

  constructor(
    private router: Router,

    private cursosService:
      CursosService

  ) {

    this.cursos =
      this.cursosService.listar();

  }

  volver(): void {

    this.router.navigate([
      '/admin/dashboard'
    ]);

  }

}