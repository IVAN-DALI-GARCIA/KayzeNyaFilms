import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

// Describe el grupo de pruebas para el componente principal de la aplicación
describe('AppComponent', () => {
  // Configura el entorno de pruebas antes de cada test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, // Importa el módulo de rutas para pruebas
      ],
      declarations: [
        AppComponent, // Declara el componente a probar
      ],
    }).compileComponents();
  });

  // Prueba que el componente se cree correctamente
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Prueba que la propiedad title del componente sea 'peliculasapp'
  it(`should have as title 'peliculasapp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('peliculasapp');
  });

  // Prueba que el título se renderice correctamente en el HTML
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, peliculasapp'
    );
  });
});
