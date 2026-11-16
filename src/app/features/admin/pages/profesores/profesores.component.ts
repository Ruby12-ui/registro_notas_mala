import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfesoresService } from '../../services/profesores.service';
import { Profesor } from '../../interfaces/profesor.interface';

@Component({
  selector: 'app-profesores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profesores.component.html',
  styleUrl: './profesores.component.css'
})
export class ProfesoresComponent implements OnInit {

  profesores: Profesor[] = [];
  cargando = false;
  error = '';

  mostrarModal = false;
  modoEdicion = false;
  guardando = false;

  form: Profesor = this.formVacio();

  constructor(
    private router: Router,
    private profesoresService: ProfesoresService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.profesoresService.listar().subscribe({
      next: (data) => {
        this.profesores = data;
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

  abrirEditar(prof: Profesor): void {
    this.form = { ...prof };
    this.modoEdicion = true;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardar(): void {
    this.guardando = true;
    if (this.modoEdicion && this.form.id) {
      this.profesoresService.actualizar(this.form.id, this.form).subscribe({
        next: () => {
          this.guardando = false;
          this.mostrarModal = false;
          this.cargar();
        },
        error: () => {
          this.error = 'Error al actualizar el profesor.';
          this.guardando = false;
        }
      });
    } else {
      this.profesoresService.crear(this.form).subscribe({
        next: () => {
          this.guardando = false;
          this.mostrarModal = false;
          this.cargar();
        },
        error: () => {
          this.error = 'Error al crear el profesor.';
          this.guardando = false;
        }
      });
    }
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este profesor?')) return;
    this.profesoresService.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: () => {
        this.error = 'Error al eliminar el profesor.';
      }
    });
  }

  cantidadActivos(): number {
    return this.profesores.filter(p => p.estado?.toUpperCase() === 'ACTIVO').length;
  }

  cantidadEspecialidades(): number {
    return new Set(this.profesores.map(p => p.especialidad)).size;
  }

  nombreCompleto(p: Profesor): string {
    return `${p.nombres} ${p.apellidos}`;
  }

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  private formVacio(): Profesor {
    return {
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      nombres: '',
      apellidos: '',
      especialidad: '',
      telefono: '',
      correo: '',
      fechaContratacion: '',
      estado: 'ACTIVO'
    };
  }
}
