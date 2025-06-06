import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/caretelera.interface';

@Component({
  selector: 'app-slideshow', // Selector para usar el componente en HTML
  standalone: true, // Indica que el componente es standalone (Angular 14+)
  imports: [CommonModule], // Importa módulos necesarios
  templateUrl: './slideshow.component.html', // Ruta del archivo de template HTML
  styleUrl: './slideshow.component.css', // Ruta del archivo de estilos CSS
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() movies?: Movie[]; // Recibe el arreglo de películas como input desde el componente padre

  mySwiper?: Swiper; // Instancia de Swiper para controlar el slideshow

  // Inyección del servicio Router para navegación programática
  constructor(private router: Router) {}

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    console.log(this.movies); // Muestra las películas recibidas en consola (útil para depuración)
  }

  // Método del ciclo de vida que se ejecuta después de que la vista ha sido inicializada
  ngAfterViewInit(): void {
    // Inicializa el slider Swiper con la opción de loop infinito
    this.mySwiper = new Swiper('.swiper', {
      loop: true,
    });
  }

  // Método para ir al slide anterior
  onSlidePrev() {
    this.mySwiper?.slidePrev();
  }

  // Método para ir al siguiente slide
  onSlideNext() {
    this.mySwiper?.slideNext();
  }

  // Método para navegar a la página de detalle de la película seleccionada
  onMovieCLick(movie: Movie) {
    this.router.navigate(['/pelicula', movie.id]);
  }
}
