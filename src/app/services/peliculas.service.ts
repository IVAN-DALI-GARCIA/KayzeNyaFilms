import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/caretelera.interface';
import { MovieDetails } from '../interfaces/details.interface';
import { Cast, Credits } from '../interfaces/credits.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  // URL base de la API de TMDB
  private URL = 'https://api.themoviedb.org/3';

  // API Key obtenida desde el archivo de entorno (environment.ts)
  private apiKey = environment.apiKey || 'TU_API_KEY_AQUI';
  // Asegúrate de que este archivo no se suba a un repositorio público para proteger tu clave de API.
  // Puedes configurar la API Key en el archivo environment.ts de tu proyecto Angular.
  // Si no tienes una API Key, puedes obtener una registrándote en https://www.themoviedb.org/documentation/api
  // y creando una cuenta gratuita. Una vez que tengas tu clave, reemplaza 'TU_API_KEY_AQUI' con tu clave real.
  // Nota: Es importante mantener tu API Key segura y no exponerla públicamente en repositorios de código.
  // Puedes usar variables de entorno o servicios de configuración para manejar la clave de forma segura.
  // En este caso, se utiliza el archivo environment.ts para almacenar la clave de API de forma segura.

  // Encabezados para las peticiones HTTP, incluyendo la autenticación Bearer con la API Key
  private headers = { Authorization: `Bearer ${this.apiKey}` };

  // Página actual de la cartelera (para paginación)
  private cartelePage = 1;

  // Bandera para indicar si se está cargando información
  public cargando = false;

  // Inyección del servicio HttpClient para realizar peticiones HTTP
  constructor(private http: HttpClient) {}

  /**
   * Obtiene la cartelera de películas en estreno (now playing).
   * Utiliza paginación y evita llamadas duplicadas si ya está cargando.
   * @returns Observable<Movie[]> - Lista de películas en cartelera
   */
  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      // Si ya está cargando, retorna un observable vacío
      return of([]);
    }

    this.cargando = true;

    return this.http
      .get<CarteleraResponse>(
        `${this.URL}/movie/now_playing?language=es-ES&page=${this.cartelePage}`,
        { headers: this.headers }
      )
      .pipe(
        // Extrae solo el array de películas de la respuesta
        map((response: any) => response.results),

        // Al finalizar, incrementa la página y marca que ya no está cargando
        tap(() => {
          this.cartelePage += 1;
          this.cargando = false;
        })
      );
  }

  /**
   * Busca películas por texto.
   * @param texto - Texto de búsqueda
   * @returns Observable<Movie[]> - Lista de películas encontradas
   */
  buscarPeliculas(texto: string): Observable<Movie[]> {
    return this.http
      .get<CarteleraResponse>(
        `${this.URL}/search/movie?query=${texto}&language=es-ES&page=1`,
        { headers: this.headers }
      )
      .pipe(map((res) => res.results));
  }

  /**
   * Obtiene el detalle de una película por su ID.
   * @param id - ID de la película
   * @returns Observable<MovieDetails | null> - Detalle de la película o null si hay error
   */
  peliculaDetalle(id: string) {
    return this.http
      .get<MovieDetails>(`${this.URL}/movie/${id}?language=es-ES`, {
        headers: this.headers,
      })
      .pipe(catchError((err) => of(null)));
  }

  /**
   * Obtiene los créditos (reparto) de una película por su ID.
   * @param id - ID de la película
   * @returns Observable<Cast[] | null> - Lista de actores o null si hay error
   */
  peliculaCreditos(id: string): Observable<Cast[] | null> {
    return this.http
      .get<Credits>(`${this.URL}/movie/${id}/credits?language=es-ES`, {
        headers: this.headers,
      })
      .pipe(
        map((res) => res.cast),
        catchError((err) => of(null))
      );
  }

  /**
   * Reinicia el contador de página de la cartelera.
   */
  resetPeliculaPage() {
    this.cartelePage = 1;
  }
}
