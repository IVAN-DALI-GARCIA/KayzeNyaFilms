import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movie } from '../../interfaces/caretelera.interface'; // Importa la interfaz Movie
import { Router } from '@angular/router'; // Importa el servicio Router para navegación
import { PipesModule } from '../../pipes/pipes.module'; // Importa el módulo de pipes personalizados

@Component({
  selector: 'app-peliculas-poster', // Selector para usar el componente en HTML
  standalone: true, // Indica que el componente es standalone (Angular 14+)
  imports: [CommonModule, PipesModule], // Importa módulos necesarios
  templateUrl: './peliculas-poster.component.html', // Ruta del archivo de template HTML
  styleUrl: './peliculas-poster.component.css', // Ruta del archivo de estilos CSS
})
export class PeliculasPosterComponent {
  @Input() movies?: Movie[]; // Recibe el arreglo de películas como input desde el componente padre

  // Inyección del servicio Router para navegación programática
  constructor(private router: Router) {}

  /**
   * Genera un arreglo para mostrar estrellas según el promedio de votos.
   * @param voteAverage - Promedio de votos de la película
   * @returns Array de longitud igual al número de estrellas a mostrar
   */
  getStars(voteAverage: number) {
    const starsCount = Math.floor(voteAverage); // Redondea hacia abajo el promedio de votos
    return Array(starsCount).fill(0); // Retorna un arreglo con la cantidad de estrellas
  }

  /**
   * Navega a la página de detalle de la película seleccionada.
   * @param movie - Objeto de la película seleccionada
   */
  onMovieCLick(movie: Movie) {
    this.router.navigate(['/pelicula', movie.id]); // Navega a la ruta de detalle de la película
  }
}
