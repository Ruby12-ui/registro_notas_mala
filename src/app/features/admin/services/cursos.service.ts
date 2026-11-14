import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Curso } from '../interfaces/curso.interface';

@Injectable({ providedIn: 'root' })
export class CursosService {

  private url: string;

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {
    this.url = `${this.api.baseUrl}/cursos`;
  }

  listar(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url);
  }

  obtenerPorId(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.url}/${id}`);
  }

  crear(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.url, curso);
  }

  actualizar(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.url}/${id}`, curso);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
