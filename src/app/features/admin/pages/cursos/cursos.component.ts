import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { Curso } from '../../interfaces/curso.interface';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent implements OnInit {

  cursos: Curso[] = [];
  cargando = false;
  error = '';

  mostrarModal = false;
  modoEdicion = false;
  guardando = false;

  form: Curso = this.formVacio();

  constructor(
    private router: Router,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.cursosService.listar().subscribe({
      next: (data) => {
        this.cursos = data;
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

  abrirEditar(curso: Curso): void {
    this.form = { ...curso };
    this.modoEdicion = true;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardar(): void {
    this.guardando = true;
    if (this.modoEdicion && this.form.id) {
      this.cursosService.actualizar(this.form.id, this.form).subscribe({
        next: () => {
          this.guardando = false;
          this.mostrarModal = false;
          this.cargar();
        },
        error: () => {
          this.error = 'Error al actualizar el curso.';
          this.guardando = false;
        }
      });
    } else {
      this.cursosService.crear(this.form).subscribe({
        next: () => {
          this.guardando = false;
          this.mostrarModal = false;
          this.cargar();
        },
        error: () => {
          this.error = 'Error al crear el curso.';
          this.guardando = false;
        }
      });
    }
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este curso?')) return;
    this.cursosService.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: () => {
        this.error = 'Error al eliminar el curso.';
      }
    });
  }

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  private formVacio(): Curso {
    return {
      nombre: '',
      descripcion: '',
      nivelEducativo: '',
      estado: 'Activo'
    };
  }
}
