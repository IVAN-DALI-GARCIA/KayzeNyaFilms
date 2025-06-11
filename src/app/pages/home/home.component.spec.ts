import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { PeliculasService } from '../../services/peliculas.service';
import { of } from 'rxjs';
import { Movie, OriginalLanguage } from '../../interfaces/caretelera.interface';

// Mock de PeliculasService con datos de prueba
const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Pelicula 1',
    poster_path: '',
    vote_average: 8,
    vote_count: 100,
    overview: '',
    release_date: '',
    genre_ids: [],
    original_language: OriginalLanguage.En,
    original_title: '',
    popularity: 0,
    video: false,
    adult: false,
    backdrop_path: '',
  },
];

// Clase mock para simular el servicio de películas
class MockPeliculasService {
  resetPeliculaPage = jasmine.createSpy('resetPeliculaPage'); // Espía para verificar llamadas
  getCartelera() {
    return of(mockMovies); // Devuelve un observable con las películas mock
  }
}

// Grupo de pruebas para el componente HomeComponent
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let peliculasSvc: MockPeliculasService;

  // Configura el entorno de pruebas antes de cada test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [HomeComponent],
      providers: [
        { provide: PeliculasService, useClass: MockPeliculasService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    peliculasSvc = TestBed.inject(PeliculasService) as any;
  });

  // Prueba que el componente se cree correctamente
  it('debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  // Prueba que el método resetPeliculaPage se llame en el constructor
  it('debe llamar a resetPeliculaPage en el constructor', () => {
    expect(peliculasSvc.resetPeliculaPage).toHaveBeenCalled();
  });

  // Prueba que se carguen películas al inicializar el componente
  it('debe cargar películas al inicializar', () => {
    component.ngOnInit();
    expect(component.movies.length).toBeGreaterThan(0);
    expect(component.movies[0].title).toBe('Pelicula 1');
  });

  // Prueba que loadedMoviesIds se actualice después de cargar películas
  it('debe actualizar loadedMoviesIds después de cargar películas', () => {
    component.ngOnInit();
    expect(component.loadedMoviesIds.has(1)).toBeTrue();
  });

  // Prueba que loadMoreMovies agregue nuevas películas y actualice loadedMoviesIds
  it('debe agregar nuevas películas al llamar loadMoreMovies', () => {
    component.movies = [];
    component.loadedMoviesIds.clear();
    component.loadMoreMovies();
    expect(component.movies.length).toBeGreaterThan(0);
    expect(component.loadedMoviesIds.has(1)).toBeTrue();
  });

  // Prueba que updateLoadedMovieIds actualice correctamente el set de IDs
  it('debe actualizar loadedMoviesIds correctamente', () => {
    component.movies = mockMovies;
    component.loadedMoviesIds.clear();
    component.updateLoadedMovieIds();
    expect(component.loadedMoviesIds.has(1)).toBeTrue();
  });
});
