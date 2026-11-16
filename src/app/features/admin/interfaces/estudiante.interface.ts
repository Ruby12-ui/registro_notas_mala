export interface Estudiante {
  id?: number;
  codigo?: string;
  codigoEstudiante?: string;  // alias para compatibilidad con el form
  tipoDocumento?: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento?: string;
  genero?: string;
  nombreApoderado?: string;
  telefonoApoderado?: string;
  relacionApoderado?: string;
  nivelEducativo?: string;
  gradoId?: number;
  gradoNombre?: string;
  seccionId?: number;
  seccionNombre?: string;
  estado?: string;
}

export interface EstudianteRequest {
  codigoEstudiante: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento?: string;
  genero?: string;
  nombreApoderado?: string;
  telefonoApoderado?: string;
  relacionApoderado?: string;
  nivelEducativo?: string;
  gradoId?: number;
  seccionId?: number;
}
