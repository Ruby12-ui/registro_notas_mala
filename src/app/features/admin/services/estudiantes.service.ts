import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Estudiante } from '../interfaces/estudiante.interface';

@Injectable({ providedIn: 'root' })
export class EstudiantesService {

  private url: string;

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {
    this.url = `${this.api.baseUrl}/estudiantes`;
  }

  listar(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(this.url);
  }

  obtenerPorId(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.url}/${id}`);
  }

  crear(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(this.url, estudiante);
  }

  actualizar(id: number, estudiante: Estudiante): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.url}/${id}`, estudiante);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
