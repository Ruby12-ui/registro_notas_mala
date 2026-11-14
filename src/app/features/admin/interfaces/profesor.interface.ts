export interface Profesor {
  id?: number;
  tipoDocumento: string;
  numeroDocumento: string;
  nombres: string;
  apellidos: string;
  especialidad?: string;
  telefono?: string;
  email?: string;
  fechaContratacion?: string;
  estado: string;
}
