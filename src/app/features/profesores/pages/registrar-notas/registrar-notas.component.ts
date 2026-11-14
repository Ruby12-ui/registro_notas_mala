import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { NotasService, Nota } from '../../services/notas.service';

interface FilaNota {
  estudianteId: number;
  nombreEstudiante: string;
  nota: number;
  notaId?: number;
  guardado: boolean;
  guardando: boolean;
}

@Component({
  selector: 'app-registrar-notas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-notas.component.html',
  styleUrl: './registrar-notas.component.css'
})
export class RegistrarNotasComponent implements OnInit {

  curso = 'Matemática';
  grado = '5to de Secundaria';
  seccion = 'A';
  periodo = 'Bimestre I';

  asignacionId = 1;
  periodoAcademicoId = 1;
  nombreEvaluacion = 'Bimestre I';
  fechaEvaluacion = new Date().toISOString().split('T')[0];

  filas: FilaNota[] = [
    { estudianteId: 1, nombreEstudiante: 'Ana Torres', nota: 0, guardado: false, guardando: false },
    { estudianteId: 2, nombreEstudiante: 'María López', nota: 0, guardado: false, guardando: false },
    { estudianteId: 3, nombreEstudiante: 'Carlos Pérez', nota: 0, guardado: false, guardando: false },
    { estudianteId: 4, nombreEstudiante: 'Lucía Ramírez', nota: 0, guardado: false, guardando: false },
    { estudianteId: 5, nombreEstudiante: 'Diego Mendoza', nota: 0, guardado: false, guardando: false }
  ];

  mensaje = '';
  error = '';
  cargando = false;
  guardandoTodo = false;

  notasExistentes: Nota[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private notasService: NotasService
  ) {}

  ngOnInit(): void {
    this.cargarNotasExistentes();
  }

  cargarNotasExistentes(): void {
    this.cargando = true;
    this.notasService.listar().subscribe({
      next: (data) => {
        this.notasExistentes = data;
        this.filas.forEach(fila => {
          const existente = data.find(
            n => n.estudianteId === fila.estudianteId &&
                 n.asignacionId === this.asignacionId &&
                 n.periodoAcademicoId === this.periodoAcademicoId
          );
          if (existente) {
            fila.nota = Number(existente.nota);
            fila.notaId = existente.id;
            fila.guardado = true;
          }
        });
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  guardarTodo(): void {
    this.guardandoTodo = true;
    this.error = '';
    this.mensaje = '';

    let pendientes = this.filas.length;
    let errores = 0;

    this.filas.forEach(fila => {
      fila.guardando = true;
      const payload: Nota = {
        estudianteId: fila.estudianteId,
        asignacionId: this.asignacionId,
        periodoAcademicoId: this.periodoAcademicoId,
        nombreEvaluacion: this.nombreEvaluacion,
        nota: fila.nota,
        fechaEvaluacion: this.fechaEvaluacion
      };

      const operacion = fila.notaId
        ? this.notasService.actualizar(fila.notaId, { ...payload, id: fila.notaId })
        : this.notasService.crear(payload);

      operacion.subscribe({
        next: (resultado) => {
          fila.notaId = resultado.id;
          fila.guardado = true;
          fila.guardando = false;
          pendientes--;
          if (pendientes === 0) {
            this.guardandoTodo = false;
            if (errores === 0) {
              this.mensaje = 'Calificaciones guardadas correctamente.';
            } else {
              this.error = `${errores} calificaciones no se pudieron guardar.`;
            }
          }
        },
        error: () => {
          errores++;
          fila.guardando = false;
          pendientes--;
          if (pendientes === 0) {
            this.guardandoTodo = false;
            this.error = `${errores} calificaciones no se pudieron guardar.`;
          }
        }
      });
    });
  }

  actualizarNota(fila: FilaNota, evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const valor = Number(input.value);
    if (valor >= 0 && valor <= 20) {
      fila.nota = valor;
      fila.guardado = false;
    }
  }

  irDashboard(): void { this.router.navigate(['/profesor/dashboard']); }
  irCursos(): void { this.router.navigate(['/profesor/mis-cursos']); }
  irNotas(): void { this.router.navigate(['/profesor/registrar-notas']); }
  irAsistencia(): void { this.router.navigate(['/profesor/registrar-asistencia']); }
  irPerfil(): void { this.router.navigate(['/profesor/mi-perfil']); }
  cerrarSesion(): void { this.authService.logout(); }
}
