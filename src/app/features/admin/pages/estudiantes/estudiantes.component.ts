import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudiantesService } from '../../services/estudiantes.service';
import { Estudiante } from '../../interfaces/estudiante.interface';

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

  form: Estudiante = this.formVacio();

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
    this.modoEdicion = false;
    this.mostrarModal = true;
  }

  abrirEditar(est: Estudiante): void {
    this.form = { ...est };
    this.modoEdicion = true;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardar(): void {
    this.guardando = true;
    if (this.modoEdicion && this.form.id) {
      this.estudiantesService.actualizar(this.form.id, this.form).subscribe({
        next: () => {
          this.guardando = false;
          this.mostrarModal = false;
          this.cargar();
        },
        error: () => {
          this.error = 'Error al actualizar el estudiante.';
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
        error: () => {
          this.error = 'Error al crear el estudiante.';
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
    return this.estudiantes.filter(e => e.estado === 'Activo').length;
  }

  nombreCompleto(e: Estudiante): string {
    return `${e.nombres} ${e.apellidos}`;
  }

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  private formVacio(): Estudiante {
    return {
      codigoEstudiante: '',
      dni: '',
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      genero: '',
      direccion: '',
      gradoId: 1,
      seccionId: 1,
      fechaMatricula: new Date().toISOString().split('T')[0],
      estado: 'Activo'
    };
  }
}
