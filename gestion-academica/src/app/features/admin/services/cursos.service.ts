import { Injectable } from '@angular/core';

import {
  Curso
} from '../interfaces/curso.interface';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursos: Curso[] = [

    {
      id: 1,
      nombre: 'Matemática',
      nivel: 'Secundaria',
      grado: '5to',
      horas: 5,
      estado: 'Activo'
    },

    {
      id: 2,
      nombre: 'Comunicación',
      nivel: 'Secundaria',
      grado: '5to',
      horas: 4,
      estado: 'Activo'
    },

    {
      id: 3,
      nombre: 'Ciencia y Tecnología',
      nivel: 'Secundaria',
      grado: '3ro',
      horas: 4,
      estado: 'Activo'
    }

  ];

  listar(): Curso[] {

    return this.cursos;

  }

  obtenerPorId(
    id: number
  ): Curso | undefined {

    return this.cursos.find(
      curso => curso.id === id
    );

  }

}