import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarComponent } from './buscar.component';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { of } from 'rxjs';
import { Movie } from '../../interfaces/caretelera.interface';
import { OriginalLanguage } from '../../interfaces/caretelera.interface';

// Mock de datos de películas para las pruebas
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
    original_language: OriginalLanguage.En, // Usa el enum para el idioma original
    original_title: '',
    popularity: 0,
    video: false,
    adult: false,
    backdrop_path: '',
  },
];

// Mock de ActivatedRoute para simular los parámetros de la ruta
const mockActivatedRoute = {
  params: of({ texto: 'accion' }), // Simula que el parámetro 'texto' es 'accion'
};

// Mock de PeliculasService para simular el servicio real
class MockPeliculasService {
  // Espía que simula el método buscarPeliculas y retorna un observable con mockMovies
  buscarPeliculas = jasmine
    .createSpy('buscarPeliculas')
    .and.returnValue(of(mockMovies));
}

// Grupo de pruebas para el componente BuscarComponent
describe('BuscarComponent', () => {
  let component: BuscarComponent;
  let fixture: ComponentFixture<BuscarComponent>;
  let peliculasSvc: MockPeliculasService;

  // Configura el entorno de pruebas antes de cada test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [BuscarComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }, // Usa el mock de ActivatedRoute
        { provide: PeliculasService, useClass: MockPeliculasService }, // Usa el mock de PeliculasService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarComponent);
    component = fixture.componentInstance;
    peliculasSvc = TestBed.inject(PeliculasService) as any;
  });

  // Prueba que el componente se cree correctamente
  it('debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  // Prueba que el texto de búsqueda se obtenga desde los parámetros de la ruta
  it('debe obtener el texto de búsqueda desde los parámetros de la ruta', () => {
    component.ngOnInit();
    expect(component.texto).toBe('accion');
  });

  // Prueba que buscarPeliculas sea llamado y asigne el resultado a movies
  it('debe llamar a buscarPeliculas y asignar el resultado a movies', () => {
    component.ngOnInit();
    expect(peliculasSvc.buscarPeliculas).toHaveBeenCalledWith('accion');
    expect(component.movies.length).toBeGreaterThan(0);
    expect(component.movies[0].title).toBe('Pelicula 1');
  });

  // Prueba que se muestre el mensaje si no se encuentran películas
  it('debe mostrar mensaje si no se encuentran películas', () => {
    peliculasSvc.buscarPeliculas.and.returnValue(of([])); // Simula que no hay resultados
    component.ngOnInit();
    expect(component.noMovie).toBe('😌 No se encontro la pelicula');
  });
});
