import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';

@Component({
  selector: 'app-scroll-to-top', // Selector para usar el componente en HTML
  standalone: true, // Indica que el componente es standalone (Angular 14+)
  imports: [CommonModule], // Importa módulos necesarios
  templateUrl: './scroll-to-top.component.html', // Ruta del archivo de template HTML
  styleUrl: './scroll-to-top.component.css', // Ruta del archivo de estilos CSS
})
export class ScrollToTopComponent {
  windowScrolled = false; // Bandera para mostrar/ocultar el botón de scroll-to-top

  // Inyección del objeto Document para manipular el DOM
  constructor(@Inject(DOCUMENT) private document: Document) {}

  // Escucha el evento de scroll en la ventana
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Si el usuario ha hecho scroll hacia abajo más de 100px, muestra el botón
    if (
      window.screenY ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop > 100
    ) {
      this.windowScrolled = true;
      // Si el usuario vuelve cerca del tope de la página, oculta el botón
    } else if (
      this.windowScrolled &&
      (window.screenY ||
        this.document.documentElement.scrollTop ||
        this.document.body.scrollTop < 10)
    ) {
      this.windowScrolled = false;
    }
  }

  // Método para hacer scroll suave hasta el tope de la página
  scrollTop() {
    this.document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    this.document.body.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
