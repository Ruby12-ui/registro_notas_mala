export type Rol =
  'ADMIN' |
  'PROFESOR' |
  'ESTUDIANTE';

export interface Usuario {

  usuario: string;

  nombre: string;

  rol: Rol;

}