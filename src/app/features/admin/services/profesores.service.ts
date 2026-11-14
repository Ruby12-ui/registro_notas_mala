import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Profesor } from '../interfaces/profesor.interface';

@Injectable({ providedIn: 'root' })
export class ProfesoresService {

  private url: string;

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {
    this.url = `${this.api.baseUrl}/profesores`;
  }

  listar(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.url);
  }

  obtenerPorId(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.url}/${id}`);
  }

  crear(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.url, profesor);
  }

  actualizar(id: number, profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.url}/${id}`, profesor);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
