export interface Curso {
  id?: number;
  codigo?: string;
  nombre: string;
  descripcion?: string;
  nivel?: string;
  horasSemanales?: number;
  profesorId?: number;
  profesorNombre?: string;
  gradoIds?: number[];
  gradoNombres?: string[];
  estado?: string;
}
