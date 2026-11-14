import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { AsistenciasService, Asistencia } from '../../services/asistencias.service';

interface FilaAsistencia {
  estudianteId: number;
  nombreEstudiante: string;
  estado: 'Presente' | 'Falta' | 'Tardanza';
  asistenciaId?: number;
  guardado: boolean;
}

@Component({
  selector: 'app-registrar-asistencia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-asistencia.component.html',
  styleUrl: './registrar-asistencia.component.css'
})
export class RegistrarAsistenciaComponent implements OnInit {

  curso = 'Matemática';
  grado = '5to de Secundaria';
  seccion = 'A';

  fecha = new Date().toISOString().split('T')[0];
  periodoAcademicoId = 1;

  filas: FilaAsistencia[] = [
    { estudianteId: 1, nombreEstudiante: 'Ana Torres', estado: 'Presente', guardado: false },
    { estudianteId: 2, nombreEstudiante: 'María López', estado: 'Presente', guardado: false },
    { estudianteId: 3, nombreEstudiante: 'Carlos Pérez', estado: 'Falta', guardado: false },
    { estudianteId: 4, nombreEstudiante: 'Lucía Ramírez', estado: 'Presente', guardado: false },
    { estudianteId: 5, nombreEstudiante: 'Diego Mendoza', estado: 'Tardanza', guardado: false }
  ];

  mensaje = '';
  error = '';
  guardandoTodo = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private asistenciasService: AsistenciasService
  ) {}

  ngOnInit(): void {
    this.cargarAsistenciasExistentes();
  }

  cargarAsistenciasExistentes(): void {
    this.asistenciasService.listar().subscribe({
      next: (data) => {
        this.filas.forEach(fila => {
          const existente = data.find(
            a => a.estudianteId === fila.estudianteId &&
                 a.fechaAsistencia === this.fecha &&
                 a.periodoAcademicoId === this.periodoAcademicoId
          );
          if (existente) {
            fila.estado = existente.estado as any;
            fila.asistenciaId = existente.id;
            fila.guardado = true;
          }
        });
      },
      error: () => {}
    });
  }

  cambiarEstado(fila: FilaAsistencia, estado: 'Presente' | 'Falta' | 'Tardanza'): void {
    fila.estado = estado;
    fila.guardado = false;
  }

  guardarAsistencia(): void {
    this.guardandoTodo = true;
    this.error = '';
    this.mensaje = '';

    let pendientes = this.filas.length;
    let errores = 0;

    this.filas.forEach(fila => {
      const payload: Asistencia = {
        estudianteId: fila.estudianteId,
        periodoAcademicoId: this.periodoAcademicoId,
        fechaAsistencia: this.fecha,
        estado: fila.estado
      };

      const operacion = fila.asistenciaId
        ? this.asistenciasService.actualizar(fila.asistenciaId, { ...payload, id: fila.asistenciaId })
        : this.asistenciasService.crear(payload);

      operacion.subscribe({
        next: (resultado) => {
          fila.asistenciaId = resultado.id;
          fila.guardado = true;
          pendientes--;
          if (pendientes === 0) {
            this.guardandoTodo = false;
            if (errores === 0) {
              this.mensaje = 'Asistencia guardada correctamente.';
            } else {
              this.error = `${errores} registros no se pudieron guardar.`;
            }
          }
        },
        error: () => {
          errores++;
          pendientes--;
          if (pendientes === 0) {
            this.guardandoTodo = false;
            this.error = `${errores} registros no se pudieron guardar.`;
          }
        }
      });
    });
  }

  cantidadPresentes(): number { return this.filas.filter(f => f.estado === 'Presente').length; }
  cantidadFaltas(): number { return this.filas.filter(f => f.estado === 'Falta').length; }
  cantidadTardanzas(): number { return this.filas.filter(f => f.estado === 'Tardanza').length; }

  irDashboard(): void { this.router.navigate(['/profesor/dashboard']); }
  irCursos(): void { this.router.navigate(['/profesor/mis-cursos']); }
  irNotas(): void { this.router.navigate(['/profesor/registrar-notas']); }
  irAsistencia(): void { this.router.navigate(['/profesor/registrar-asistencia']); }
  irPerfil(): void { this.router.navigate(['/profesor/mi-perfil']); }
  cerrarSesion(): void { this.authService.logout(); }
}
