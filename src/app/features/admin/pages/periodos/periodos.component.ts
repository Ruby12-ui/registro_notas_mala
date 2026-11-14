import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PeriodosService } from '../../services/periodos.service';
import { Periodo } from '../../interfaces/periodo.interface';

@Component({
  selector: 'app-periodos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './periodos.component.html',
  styleUrl: './periodos.component.css'
})
export class PeriodosComponent implements OnInit {

  periodos: Periodo[] = [];
  cargando = false;
  error = '';

  mostrarModal = false;
  modoEdicion = false;
  guardando = false;

  form: Periodo = this.formVacio();

  constructor(
    private router: Router,
    private periodosService: PeriodosService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.cargando = true;
    this.error = '';
    this.periodosService.listar().subscribe({
      next: (data) => {
        this.periodos = data;
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

  abrirEditar(periodo: Periodo): void {
    this.form = { ...periodo };
    this.modoEdicion = true;
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  guardar(): void {
    this.guardando = true;
    if (this.modoEdicion && this.form.id) {
      this.periodosService.actualizar(this.form.id, this.form).subscribe({
        next: () => {
          this.guardando = false;
          this.mostrarModal = false;
          this.cargar();
        },
        error: () => {
          this.error = 'Error al actualizar el periodo.';
          this.guardando = false;
        }
      });
    } else {
      this.periodosService.crear(this.form).subscribe({
        next: () => {
          this.guardando = false;
          this.mostrarModal = false;
          this.cargar();
        },
        error: () => {
          this.error = 'Error al crear el periodo.';
          this.guardando = false;
        }
      });
    }
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar este periodo académico?')) return;
    this.periodosService.eliminar(id).subscribe({
      next: () => this.cargar(),
      error: () => {
        this.error = 'Error al eliminar el periodo.';
      }
    });
  }

  cantidadActivos(): number {
    return this.periodos.filter(p => p.estado === 'Activo').length;
  }

  cantidadFinalizados(): number {
    return this.periodos.filter(p => p.estado === 'Finalizado').length;
  }

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  private formVacio(): Periodo {
    return {
      nombre: '',
      fechaInicio: '',
      fechaFin: '',
      estado: 'Activo'
    };
  }
}
