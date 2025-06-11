// poster.pipe.spec.ts
import { PosterPipe } from './poster.pipe';

// Grupo de pruebas para el pipe PosterPipe
describe('PosterPipe', () => {
  const pipe = new PosterPipe(); // Crea una instancia del pipe

  // Prueba que la instancia del pipe se cree correctamente
  it('debe crear una instancia', () => {
    expect(pipe).toBeTruthy();
  });

  // Prueba que el pipe retorne la URL completa si recibe un string válido
  it('debe retornar la URL completa si recibe un string', () => {
    expect(pipe.transform('abc.jpg')).toContain(
      'https://image.tmdb.org/t/p/w500/abc.jpg'
    );
  });

  // Prueba que el pipe retorne la imagen por defecto si no recibe nada
  it('debe retornar la imagen por defecto si no recibe nada', () => {
    expect(pipe.transform('')).toBe('./assets/noImage.png');
  });
});
