import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GradosService } from '../../services/grados.service';
import { Grado } from '../../interfaces/grado.interface';

@Component({
  selector: 'app-grados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grados.component.html',
  styleUrl: './grados.component.css'
})
export class GradosComponent implements OnInit {

  grados: Grado[] = [];
  cargando = false;
  error = '';

  mostrarModal = false;
  modoEdicion = false;
  guardando = false;
  idEditando?: number;

  form: Grado = this.formVacio();

  constructor(private router: Router, private gradosService: GradosService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.gradosService.listar().subscribe({
      next: (data) => { this.grados = data; this.cargando = false; },
      error: () => { this.error = 'No se pudo conectar con el servidor.'; this.cargando = false; }
    });
  }

  abrirCrear(): void {
    this.form = this.formVacio();
    this.idEditando = undefined;
    this.modoEdicion = false;
    this.mostrarModal = true;
  }

  abrirEditar(g: Grado): void {
    this.idEditando = g.id;
    this.form = { nombre: g.nombre, nivel: g.nivel ?? '' };
    this.modoEdicion = true;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardar(): void {
    this.guardando = true;
    if (this.modoEdicion && this.idEditando) {
      this.gradosService.actualizar(this.idEditando, this.form).subscribe({
        next: () => { this.guardando = false; this.mostrarModal = false; this.cargar(); },
        error: (err) => { this.error = err?.error?.message ?? 'Error al actualizar el grado.'; this.guardando = false; }
      });
    } else {
      this.gradosService.crear(this.form).subscribe({
        next: () => { this.guardando = false; this.mostrarModal = false; this.cargar(); },
        error: (err) => { this.error = err?.error?.message ?? 'Error al crear el grado.'; this.guardando = false; }
      });
    }
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este grado?')) return;
    this.gradosService.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: () => { this.error = 'Error al eliminar el grado.'; }
    });
  }

  contarPorNivel(nivel: string): number {
    return this.grados.filter(g => g.nivel?.toUpperCase() === nivel.toUpperCase()).length;
  }

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  private formVacio(): Grado {
    return { nombre: '', nivel: 'PRIMARIA' };
  }
}
