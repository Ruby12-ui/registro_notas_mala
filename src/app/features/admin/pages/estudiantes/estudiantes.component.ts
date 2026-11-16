import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiante, EstudianteRequest } from '../../interfaces/estudiante.interface';

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiantes.component.html',
  styleUrl: './estudiantes.component.css'
})
export class EstudiantesComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  cargando = false;
  error = '';

  mostrarModal = false;
  modoEdicion = false;
  guardando = false;
  idEditando?: number;

  form: EstudianteRequest = this.formVacio();

  constructor(
    private router: Router,
    private estudiantesService: EstudiantesService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.estudiantesService.listar().subscribe({
      next: (data) => {
        this.estudiantes = data;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con el servidor.';
        this.cargando = false;
      }
    });
  }

  abrirCrear(): void {
    this.form = this.formVacio();
    this.idEditando = undefined;
    this.modoEdicion = false;
    this.mostrarModal = true;
  }

  abrirEditar(est: Estudiante): void {
    this.idEditando = est.id;
    this.form = {
      codigoEstudiante: est.codigo ?? est.codigoEstudiante ?? '',
      tipoDocumento:    est.tipoDocumento ?? 'DNI',
      numeroDocumento:  est.numeroDocumento,
      nombres:          est.nombres,
      apellidos:        est.apellidos,
      fechaNacimiento:  est.fechaNacimiento ?? '',
      genero:           est.genero ?? '',
      nombreApoderado:  est.nombreApoderado ?? '',
      telefonoApoderado: est.telefonoApoderado ?? '',
      relacionApoderado: est.relacionApoderado ?? '',
      nivelEducativo:   est.nivelEducativo ?? '',
      gradoId:          est.gradoId,
      seccionId:        est.seccionId,
    };
    this.modoEdicion = true;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardar(): void {
    this.guardando = true;
    if (this.modoEdicion && this.idEditando) {
      this.estudiantesService.actualizar(this.idEditando, this.form).subscribe({
        next: () => {
          this.guardando = false;
          this.mostrarModal = false;
          this.cargar();
        },
        error: (err) => {
          this.error = err?.error?.message ?? 'Error al actualizar el estudiante.';
          this.guardando = false;
        }
      });
    } else {
      this.estudiantesService.crear(this.form).subscribe({
        next: () => {
          this.guardando = false;
          this.mostrarModal = false;
          this.cargar();
        },
        error: (err) => {
          this.error = err?.error?.message ?? 'Error al crear el estudiante.';
          this.guardando = false;
        }
      });
    }
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este estudiante?')) return;
    this.estudiantesService.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: () => {
        this.error = 'Error al eliminar el estudiante.';
      }
    });
  }

  cantidadActivos(): number {
    return this.estudiantes.filter(e => e.estado?.toUpperCase() === 'ACTIVO').length;
  }

  nombreCompleto(e: Estudiante): string {
    return `${e.nombres} ${e.apellidos}`;
  }

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  private formVacio(): EstudianteRequest {
    return {
      codigoEstudiante: '',
      tipoDocumento:    'DNI',
      numeroDocumento:  '',
      nombres:          '',
      apellidos:        '',
      fechaNacimiento:  '',
      genero:           '',
      nombreApoderado:  '',
      telefonoApoderado: '',
      relacionApoderado: '',
      nivelEducativo:   '',
      gradoId:          undefined,
      seccionId:        undefined,
    };
  }
}
