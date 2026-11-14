import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';

export interface Asistencia {
  id?: number;
  estudianteId: number;
  periodoAcademicoId: number;
  fechaAsistencia: string;
  estado: string;
  observaciones?: string;
}

@Injectable({ providedIn: 'root' })
export class AsistenciasService {

  private url: string;

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {
    this.url = `${this.api.baseUrl}/asistencias`;
  }

  listar(): Observable<Asistencia[]> {
    return this.http.get<Asistencia[]>(this.url);
  }

  crear(asistencia: Asistencia): Observable<Asistencia> {
    return this.http.post<Asistencia>(this.url, asistencia);
  }

  actualizar(id: number, asistencia: Asistencia): Observable<Asistencia> {
    return this.http.put<Asistencia>(`${this.url}/${id}`, asistencia);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
