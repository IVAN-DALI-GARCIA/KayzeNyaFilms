import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosterPipe } from './poster.pipe'; // Importa el pipe personalizado para los pósters

// Módulo que agrupa y exporta los pipes personalizados de la aplicación
@NgModule({
  declarations: [
    PosterPipe, // Declara el pipe PosterPipe para que esté disponible en el módulo
  ],
  imports: [
    CommonModule, // Importa CommonModule por si los pipes lo requieren
  ],
  exports: [
    PosterPipe, // Exporta PosterPipe para que pueda ser usado en otros módulos/componentes
  ],
})
export class PipesModule {}
