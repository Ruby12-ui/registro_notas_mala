import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface Nota {
  id?: number;
  estudianteId: number;
  asignacionId: number;
  periodoAcademicoId: number;
  nombreEvaluacion: string;
  nota: number;
  fechaEvaluacion?: string;
  observaciones?: string;
}

@Injectable({ providedIn: 'root' })
export class NotasService {

  private url: string;

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {
    this.url = `${this.api.baseUrl}/notas`;
  }

  listar(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.url);
  }

  crear(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.url, nota);
  }

  actualizar(id: number, nota: Nota): Observable<Nota> {
    return this.http.put<Nota>(`${this.url}/${id}`, nota);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
