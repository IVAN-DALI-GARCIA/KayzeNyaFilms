import { TestBed } from '@angular/core/testing';
import { PipesModule } from './pipes.module';
import { PosterPipe } from './poster.pipe';

// Grupo de pruebas para el módulo PipesModule
describe('PipesModule', () => {
  // Antes de cada prueba, configura el entorno de pruebas e importa el módulo PipesModule
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipesModule],
    }).compileComponents();
  });

  // Prueba que el módulo PipesModule se cree correctamente
  it('debe crearse el módulo correctamente', () => {
    const module = TestBed.inject(PipesModule);
    expect(module).toBeTruthy();
  });

  // Prueba que el módulo contenga el PosterPipe y pueda ser inyectado
  it('debe contener el PosterPipe', () => {
    const pipe = TestBed.inject(PosterPipe);
    expect(pipe).toBeTruthy();
  });
});
