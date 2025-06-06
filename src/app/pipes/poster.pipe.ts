import { Pipe, PipeTransform } from '@angular/core';

// Pipe personalizado para transformar la ruta del póster de una película
@Pipe({
  name: 'poster', // Nombre del pipe para usar en los templates
})
export class PosterPipe implements PipeTransform {
  // Transforma la ruta del póster en una URL completa o retorna una imagen por defecto si no existe
  transform(poster: string): string {
    // Si existe la ruta del póster, retorna la URL completa de la imagen desde TMDB
    if (poster) {
      return `https://image.tmdb.org/t/p/w500/${poster}`;
    } else {
      // Si no hay póster, retorna la ruta de una imagen por defecto local
      return './assets/noImage.png';
    }
  }
}
