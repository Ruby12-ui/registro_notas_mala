import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Periodo } from '../interfaces/periodo.interface';

@Injectable({ providedIn: 'root' })
export class PeriodosService {

  private url: string;

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {
    this.url = `${this.api.baseUrl}/periodos-academicos`;
  }

  listar(): Observable<Periodo[]> {
    return this.http.get<Periodo[]>(this.url);
  }

  obtenerPorId(id: number): Observable<Periodo> {
    return this.http.get<Periodo>(`${this.url}/${id}`);
  }

  crear(periodo: Periodo): Observable<Periodo> {
    return this.http.post<Periodo>(this.url, periodo);
  }

  actualizar(id: number, periodo: Periodo): Observable<Periodo> {
    return this.http.put<Periodo>(`${this.url}/${id}`, periodo);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
