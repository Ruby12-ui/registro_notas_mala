import { Routes } from '@angular/router';

import { authGuard } from '../../core/guards/auth.guard';

import { roleGuard } from '../../core/guards/role.guard';

export const PROFESORES_ROUTES: Routes = [

  {
    path: 'dashboard',

    canActivate: [authGuard, roleGuard],

    data: {
      roles: ['PROFESOR']
    },

    loadComponent: () =>
      import('./pages/dashboard/dashboard.component')
        .then(m => m.DashboardComponent)

  },

  {
    path: 'mis-cursos',

    canActivate: [authGuard, roleGuard],

    data: {
      roles: ['PROFESOR']
    },

    loadComponent: () =>
      import('./pages/mis-cursos/mis-cursos.component')
        .then(m => m.MisCursosComponent)

  },

  {
    path: 'registrar-notas',

    canActivate: [authGuard, roleGuard],

    data: {
      roles: ['PROFESOR']
    },

    loadComponent: () =>
      import('./pages/registrar-notas/registrar-notas.component')
        .then(m => m.RegistrarNotasComponent)

  },

  {
    path: 'registrar-asistencia',

    canActivate: [authGuard, roleGuard],

    data: {
      roles: ['PROFESOR']
    },

    loadComponent: () =>
      import('./pages/registrar-asistencia/registrar-asistencia.component')
        .then(m => m.RegistrarAsistenciaComponent)

  },

  {
    path: 'mi-perfil',

    canActivate: [authGuard, roleGuard],

    data: {
      roles: ['PROFESOR']
    },

    loadComponent: () =>
      import('./pages/mi-perfil/mi-perfil.component')
        .then(m => m.MiPerfilComponent)

  }

];