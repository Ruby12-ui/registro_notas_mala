import { Routes } from '@angular/router';

import {
  authGuard
} from '../../core/guards/auth.guard';

import {
  roleGuard
} from '../../core/guards/role.guard';

export const ADMIN_ROUTES: Routes = [

  {
    path: 'dashboard',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ADMIN']
    },

    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)

  },

  {
    path: 'estudiantes',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ADMIN']
    },

    loadComponent: () =>
      import('./pages/estudiantes/estudiantes.component')
        .then(m => m.EstudiantesComponent)

  },

  {
    path: 'profesores',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ADMIN']
    },

    loadComponent: () =>
      import('./pages/profesores/profesores.component')
        .then(m => m.ProfesoresComponent)

  },

  {
    path: 'cursos',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ADMIN']
    },

    loadComponent: () =>
      import('./pages/cursos/cursos.component')
        .then(m => m.CursosComponent)

  },

  {
    path: 'periodos',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ADMIN']
    },

    loadComponent: () =>
      import('./pages/periodos/periodos.component')
        .then(m => m.PeriodosComponent)

  }

];