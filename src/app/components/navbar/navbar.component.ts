import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar', // Selector para usar el componente en HTML
  standalone: true, // Indica que el componente es standalone (Angular 14+)
  imports: [CommonModule, RouterLink], // Importa módulos necesarios
  templateUrl: './navbar.component.html', // Ruta del archivo de template HTML
  styleUrl: './navbar.component.css', // Ruta del archivo de estilos CSS
})
export class NavbarComponent implements OnInit {
  // Inyección del servicio Router para navegación programática
  constructor(private router: Router) {}

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Aquí puedes agregar lógica de inicialización si es necesario
  }

  /**
   * Método para buscar una película.
   * Recibe el texto, lo limpia y si no está vacío navega a la ruta de búsqueda.
   * @param texto - Texto de búsqueda ingresado por el usuario
   */
  buscarPelicula(texto: string) {
    texto = texto.trim(); // Elimina espacios al inicio y final
    if (texto.length === 0) {
      // Si el texto está vacío, no hace nada
      return;
    }
    // Navega a la ruta '/buscar/:texto' pasando el texto como parámetro
    this.router.navigate(['/buscar', texto]);
  }
}
