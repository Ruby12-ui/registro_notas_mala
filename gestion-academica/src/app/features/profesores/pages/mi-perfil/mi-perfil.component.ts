import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-mi-perfil-profesor',
  standalone: true,
  imports: [],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {

  fotoPerfil: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  irDashboard(): void {
    this.router.navigate(['/profesor/dashboard']);
  }

  irCursos(): void {
    this.router.navigate(['/profesor/mis-cursos']);
  }

  irNotas(): void {
    this.router.navigate(['/profesor/registrar-notas']);
  }

  irAsistencia(): void {
    this.router.navigate(['/profesor/registrar-asistencia']);
  }

  irPerfil(): void {
    this.router.navigate(['/profesor/mi-perfil']);
  }

  cambiarFoto(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const archivo = input.files[0];

    if (!archivo.type.startsWith('image/')) {
      alert('Selecciona una imagen válida.');
      return;
    }

    const lector = new FileReader();

    lector.onload = () => {
      this.fotoPerfil = lector.result as string;
    };

    lector.readAsDataURL(archivo);
  }

  cerrarSesion(): void {
    this.authService.logout();
  }
}