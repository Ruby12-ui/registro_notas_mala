import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { Usuario } from '../../../auth/interfaces/usuario.interface';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  fotoPerfil: string | null = null;
  usuario: Usuario | null = null;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario();
    this.fotoPerfil = localStorage.getItem('fotoPerfil');
  }

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  seleccionarFoto(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const archivo = input.files[0];
    if (!archivo.type.startsWith('image/')) return;

    const lector = new FileReader();
    lector.onload = () => {
      this.fotoPerfil = lector.result as string;
      localStorage.setItem('fotoPerfil', this.fotoPerfil);
    };
    lector.readAsDataURL(archivo);
  }
}
