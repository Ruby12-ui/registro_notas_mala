import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Grado } from '../interfaces/grado.interface';

@Injectable({ providedIn: 'root' })
export class GradosService {

  private url: string;

  constructor(private http: HttpClient, private api: ApiService) {
    this.url = `${this.api.baseUrl}/grados`;
  }

  listar(): Observable<Grado[]> {
    return this.http.get<Grado[]>(this.url);
  }

  crear(grado: Grado): Observable<Grado> {
    return this.http.post<Grado>(this.url, grado);
  }

  actualizar(id: number, grado: Grado): Observable<Grado> {
    return this.http.put<Grado>(`${this.url}/${id}`, grado);
  }

  eliminar(id: number): Observable<Grado> {
    return this.http.delete<Grado>(`${this.url}/${id}`);
  }
}
