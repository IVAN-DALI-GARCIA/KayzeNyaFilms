import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/caretelera.interface';
import { SlideshowComponent } from '../../components/slideshow/slideshow.component';
import { PeliculasPosterComponent } from '../../components/peliculas-poster/peliculas-poster.component';

@Component({
  selector: 'app-home', // Selector para usar el componente en HTML
  standalone: true, // Indica que el componente es standalone (Angular 14+)
  imports: [CommonModule, SlideshowComponent, PeliculasPosterComponent], // Importa módulos y componentes necesarios
  templateUrl: './home.component.html', // Ruta del archivo de template HTML
  styleUrl: './home.component.css', // Ruta del archivo de estilos CSS
})
export class HomeComponent implements OnInit {
  movies: Movie[] = []; // Arreglo de películas a mostrar en la página principal
  loadedMoviesIds = new Set<number>(); // Set para almacenar los IDs de las películas ya cargadas (evita duplicados)

  // Escucha el evento de scroll en la ventana para cargar más películas al llegar al final
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Calcula la posición actual del scroll sumando 1000px
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1000;
    // Obtiene la altura máxima del documento
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    // Si la posición es mayor al máximo, carga más películas
    if (pos > max) {
      this.loadMoreMovies();
    }
  }

  // Inyección del servicio de películas
  constructor(private peliculasSvc: PeliculasService) {
    // Reinicia la página de la cartelera al crear el componente
    this.peliculasSvc.resetPeliculaPage();
  }

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.loadMovies(); // Carga las películas iniciales
  }

  // Carga las películas iniciales y actualiza el set de IDs cargados
  loadMovies() {
    this.peliculasSvc.getCartelera().subscribe((res) => {
      this.movies = res;
      this.updateLoadedMovieIds();
    });
  }

  // Carga más películas al hacer scroll y evita duplicados
  loadMoreMovies() {
    this.peliculasSvc.getCartelera().subscribe((res) => {
      // Filtra solo las películas que no han sido cargadas previamente
      const newMovies = res.filter(
        (movie) => !this.loadedMoviesIds.has(movie.id)
      );
      this.movies.push(...newMovies); // Agrega las nuevas películas al arreglo
      this.updateLoadedMovieIds(); // Actualiza el set de IDs cargados
    });
  }

  // Actualiza el set de IDs de películas cargadas
  updateLoadedMovieIds() {
    this.movies.forEach((movie) => this.loadedMoviesIds.add(movie.id));
  }
}
