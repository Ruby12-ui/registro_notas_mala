import { Routes } from '@angular/router';

import {
  authGuard
} from '../../core/guards/auth.guard';

import {
  roleGuard
} from '../../core/guards/role.guard';

export const ESTUDIANTES_ROUTES: Routes = [

  {
    path: 'dashboard',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ESTUDIANTE']
    },

    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)

  },


  {
    path: 'notas',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ESTUDIANTE']
    },

    loadComponent: () =>
      import('./pages/notas/notas.component')
        .then(m => m.NotasComponent)

  },


  {
    path: 'asistencias',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ESTUDIANTE']
    },

    loadComponent: () =>
      import('./pages/asistencias/asistencias.component')
        .then(m => m.AsistenciasComponent)

  },


  {
    path: 'mi-perfil',

    canActivate: [
      authGuard,
      roleGuard
    ],

    data: {
      roles: ['ESTUDIANTE']
    },

    loadComponent: () =>
      import('./pages/mi-perfil/mi-perfil.component')
        .then(m => m.MiPerfilComponent)

  }

];