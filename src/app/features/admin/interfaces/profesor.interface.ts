export interface Profesor {
  id?: number;
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  especialidad?: string;
  nivel?: string;
  telefono?: string;
  correo?: string;       // el backend devuelve 'correo', no 'email'
  fechaContratacion?: string;
  estado?: string;
}
