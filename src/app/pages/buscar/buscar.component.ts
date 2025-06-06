import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PeliculasPosterComponent } from '../../components/peliculas-poster/peliculas-poster.component';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/caretelera.interface';

@Component({
  selector: 'app-buscar', // Selector para usar el componente en HTML
  standalone: true, // Indica que el componente es standalone (Angular 14+)
  imports: [CommonModule, PeliculasPosterComponent], // Importa módulos necesarios
  templateUrl: './buscar.component.html', // Ruta del archivo de template HTML
  styleUrl: './buscar.component.css', // Ruta del archivo de estilos CSS
})
export class BuscarComponent implements OnInit {
  texto = ''; // Texto de búsqueda recibido por parámetro de ruta
  movies: Movie[] = []; // Arreglo de películas encontradas
  noMovie = ''; // Mensaje si no se encuentra ninguna película

  // Inyección de ActivatedRoute para obtener parámetros de la ruta y PeliculasService para buscar películas
  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasSvc: PeliculasService
  ) {}

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit() {
    // Se suscribe a los cambios de parámetros de la ruta
    this.activatedRoute.params.subscribe((params) => {
      this.texto = params['texto']; // Obtiene el texto de búsqueda de la URL
      console.log(this.texto); // Muestra el texto en consola (útil para depuración)

      // Llama al servicio para buscar películas con el texto recibido
      this.peliculasSvc.buscarPeliculas(this.texto).subscribe((movies) => {
        this.movies = movies; // Asigna el resultado al arreglo de películas
        if (this.movies.length == 0) {
          // Si no se encontraron películas, muestra un mensaje
          this.noMovie = '😌 No se encontro la pelicula';
        }
      });
    });
  }
}
