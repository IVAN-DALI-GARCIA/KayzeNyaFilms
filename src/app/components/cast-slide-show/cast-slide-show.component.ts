import { AfterViewInit, Component, Input } from '@angular/core';
import { Cast } from '../../interfaces/credits.interface'; // Importa la interfaz Cast para tipar el input
import Swiper from 'swiper'; // Importa la librería Swiper para el slide show
import { CommonModule } from '@angular/common'; // Módulo común de Angular
import { PipesModule } from '../../pipes/pipes.module'; // Módulo de pipes personalizados

@Component({
  selector: 'app-cast-slide-show', // Nombre del selector para usar el componente en HTML
  standalone: true, // Indica que el componente es standalone (Angular 14+)
  imports: [CommonModule, PipesModule], // Importa módulos necesarios para el template
  templateUrl: './cast-slide-show.component.html', // Ruta del archivo de template HTML
  styleUrl: './cast-slide-show.component.css', // Ruta del archivo de estilos CSS
})
export class CastSlideShowComponent implements AfterViewInit {
  @Input() cast?: Cast[]; // Recibe el arreglo de actores (cast) como input desde el componente padre

  // Se ejecuta después de que la vista y el DOM han sido inicializados
  ngAfterViewInit() {
    // Inicializa el slider Swiper con las opciones deseadas
    const swiper = new Swiper('.swiper', {
      slidesPerView: 5.3, // Número de slides visibles
      freeMode: true, // Permite desplazamiento libre
      spaceBetween: 15, // Espacio entre slides en píxeles
    });
  }
}
