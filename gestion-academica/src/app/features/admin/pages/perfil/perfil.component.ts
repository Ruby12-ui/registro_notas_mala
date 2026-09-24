import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  fotoPerfil: string | null = null;

  constructor(
    private router: Router
  ) {

    this.fotoPerfil =
      localStorage.getItem(
        'fotoPerfil'
      );

  }

  volver(): void {

    this.router.navigate([
      '/admin/dashboard'
    ]);

  }

  seleccionarFoto(
    evento: Event
  ): void {

    const input =
      evento.target as HTMLInputElement;

    if (
      !input.files ||
      input.files.length === 0
    ) {
      return;
    }

    const archivo =
      input.files[0];

    if (
      !archivo.type.startsWith('image/')
    ) {
      return;
    }

    const lector =
      new FileReader();

    lector.onload = () => {

      this.fotoPerfil =
        lector.result as string;

      localStorage.setItem(
        'fotoPerfil',
        this.fotoPerfil
      );

    };

    lector.readAsDataURL(archivo);

  }

}