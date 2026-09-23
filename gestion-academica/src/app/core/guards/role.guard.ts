import {
  CanActivateFn,
  Router
} from '@angular/router';

import { inject } from '@angular/core';

import {
  AuthService
} from '../../features/auth/services/auth.service';

import {
  Rol
} from '../../features/auth/interfaces/usuario.interface';

export const roleGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const usuario = authService.obtenerUsuario();

  if (!usuario) {
    return router.createUrlTree(['/login']);
  }

  const rolesPermitidos =
    route.data['roles'] as Rol[];

  if (rolesPermitidos.includes(usuario.rol)) {
    return true;
  }

  authService.irAlDashboard();

  return false;
};