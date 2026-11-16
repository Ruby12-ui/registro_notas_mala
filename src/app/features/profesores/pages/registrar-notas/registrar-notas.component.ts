import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { NotasService, Nota } from '../../services/notas.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../../core/services/api.service';

interface Estudiante {
  id: number;
  nombres: string;
  apellidos: string;
  codigo?: string;
  numeroDocumento?: string;
}

interface FilaNota {
  estudianteId: number;
  nombreEstudiante: string;
  nota: number;
  notaId?: number;
  guardado: boolean;
  guardando: boolean;
  error: string;
}

@Component({
  selector: 'app-registrar-notas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-notas.component.html',
  styleUrl: './registrar-notas.component.css'
})
export class RegistrarNotasComponent implements OnInit {

  asignacionId    = 1;
  periodoAcademicoId = 1;
  nombreEvaluacion   = 'Bimestre I';
  fechaEvaluacion    = new Date().toISOString().split('T')[0];

  filas: FilaNota[] = [];
  mensaje    = '';
  error      = '';
  cargando   = false;
  guardandoTodo = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notasService: NotasService,
    private http: HttpClient,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.cargarEstudiantes();
  }

  cargarEstudiantes(): void {
    this.cargando = true;
    this.error    = '';
    this.http.get<Estudiante[]>(`${this.api.baseUrl}/estudiantes`).subscribe({
      next: (estudiantes) => {
        this.filas = estudiantes.map(e => ({
          estudianteId:    e.id,
          nombreEstudiante: `${e.nombres} ${e.apellidos}`,
          nota:    0,
          guardado:  false,
          guardando: false,
          error:     ''
        }));
        this.cargarNotasExistentes();
      },
      error: () => {
        this.error   = 'No se pudo cargar la lista de estudiantes.';
        this.cargando = false;
      }
    });
  }

  cargarNotasExistentes(): void {
    this.notasService.listarPorAsignacionYPeriodo(this.asignacionId, this.periodoAcademicoId).subscribe({
      next: (notas) => {
        notas.forEach(n => {
          const fila = this.filas.find(f => f.estudianteId === n.estudianteId);
          if (fila) {
            fila.nota    = n.nota;
            fila.notaId  = n.id;
            fila.guardado = true;
          }
        });
        this.cargando = false;
      },
      error: () => { this.cargando = false; }
    });
  }

  recargar(): void {
    this.filas.forEach(f => { f.guardado = false; f.notaId = undefined; f.error = ''; });
    this.cargarNotasExistentes();
  }

  guardarTodo(): void {
    this.guardandoTodo = true;
    this.error   = '';
    this.mensaje = '';

    let pendientes = this.filas.length;
    let errores    = 0;

    this.filas.forEach(fila => {
      fila.guardando = true;
      fila.error     = '';

      const payload: Nota = {
        estudianteId:      fila.estudianteId,
        asignacionId:      this.asignacionId,
        periodoAcademicoId: this.periodoAcademicoId,
        nombreEvaluacion:  this.nombreEvaluacion,
        nota:              fila.nota,
        fechaEvaluacion:   this.fechaEvaluacion
      };

      const op = fila.notaId
        ? this.notasService.actualizar(fila.notaId, { ...payload, id: fila.notaId })
        : this.notasService.crear(payload);

      op.subscribe({
        next: (res) => {
          fila.notaId  = res.id;
          fila.guardado  = true;
          fila.guardando = false;
          if (--pendientes === 0) this.finish(errores);
        },
        error: (err) => {
          errores++;
          fila.guardando = false;
          fila.error     = err?.error?.message ?? 'Error al guardar.';
          if (--pendientes === 0) this.finish(errores);
        }
      });
    });
  }

  private finish(errores: number): void {
    this.guardandoTodo = false;
    if (errores === 0) this.mensaje = 'Todas las calificaciones se guardaron correctamente.';
    else this.error = `${errores} calificación(es) no se pudieron guardar. Revisa los errores en la tabla.`;
  }

  actualizarNota(fila: FilaNota, evento: Event): void {
    const val = Number((evento.target as HTMLInputElement).value);
    if (val >= 0 && val <= 20) { fila.nota = val; fila.guardado = false; }
  }

  irDashboard():  void { this.router.navigate(['/profesor/dashboard']); }
  irCursos():     void { this.router.navigate(['/profesor/mis-cursos']); }
  irNotas():      void { this.router.navigate(['/profesor/registrar-notas']); }
  irAsistencia(): void { this.router.navigate(['/profesor/registrar-asistencia']); }
  irPerfil():     void { this.router.navigate(['/profesor/mi-perfil']); }
  cerrarSesion(): void { this.authService.logout(); }
}
