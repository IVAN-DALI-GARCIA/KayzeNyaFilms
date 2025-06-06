import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { CommonModule } from '@angular/common';
import { MovieDetails } from '../../interfaces/details.interface';
import { combineLatest } from 'rxjs';
import { Cast } from '../../interfaces/credits.interface';
import { PipesModule } from '../../pipes/pipes.module';
import { CastSlideShowComponent } from '../../components/cast-slide-show/cast-slide-show.component';

@Component({
  selector: 'app-pelicula', // Selector para usar el componente en HTML
  standalone: true, // Indica que el componente es standalone (Angular 14+)
  imports: [CommonModule, PipesModule, CastSlideShowComponent], // Importa módulos y componentes necesarios
  templateUrl: './pelicula.component.html', // Ruta del archivo de template HTML
  styleUrl: './pelicula.component.css', // Ruta del archivo de estilos CSS
})
export class PeliculaComponent implements OnInit {
  pelicula?: MovieDetails; // Objeto con los detalles de la película
  cast: Cast[] = []; // Arreglo de actores de la película

  // Inyección de ActivatedRoute para obtener parámetros de la ruta y PeliculasService para obtener datos de la API
  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasSvc: PeliculasService
  ) {}

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit() {
    // Obtiene el parámetro 'id' de la URL
    const { id } = this.activatedRoute.snapshot.params;

    // Realiza dos peticiones en paralelo: detalles de la película y créditos (reparto)
    combineLatest([
      this.peliculasSvc.peliculaDetalle(id),
      this.peliculasSvc.peliculaCreditos(id),
    ]).subscribe(([movie, cast]) => {
      // Si alguna de las respuestas es null, muestra un error en consola y termina
      if (movie === null || cast === null) {
        console.error('Error: La pelicula o el reparto no se encontraron');
        return;
      }

      // Asigna los datos obtenidos a las propiedades del componente
      this.pelicula = movie;
      this.cast = cast;
    });
  }

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
   * Método para regresar a la página anterior usando el historial del navegador.
   */
  regresar() {
    window.history.back();
  }
}
