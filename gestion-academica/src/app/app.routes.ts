import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.AUTH_ROUTES)
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes')
        .then(m => m.ADMIN_ROUTES)
  },

  {
    path: 'profesor',
    loadChildren: () =>
      import('./features/profesores/profesores.routes')
        .then(m => m.PROFESORES_ROUTES)
  },

  {
    path: 'estudiante',
    loadChildren: () =>
      import('./features/estudiantes/estudiantes.routes')
        .then(m => m.ESTUDIANTES_ROUTES)
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];