export interface Estudiante {
  id?: number;
  codigoEstudiante: string;
  dni: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento?: string;
  genero?: string;
  direccion?: string;
  fotoUrl?: string;
  gradoId: number;
  seccionId: number;
  fechaMatricula: string;
  estado: string;
}
