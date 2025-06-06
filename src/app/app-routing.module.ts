import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo
import { RouterModule, Routes } from '@angular/router'; // Importa las herramientas de enrutamiento de Angular
import { HomeComponent } from './pages/home/home.component'; // Componente de la página principal
import { PeliculaComponent } from './pages/pelicula/pelicula.component'; // Componente para mostrar detalles de una película
import { BuscarComponent } from './pages/buscar/buscar.component'; // Componente para la búsqueda de películas

// Definición de las rutas de la aplicación
const routes: Routes = [
  { path: 'home', component: HomeComponent }, // Ruta para la página principal
  { path: 'pelicula/:id', component: PeliculaComponent }, // Ruta para ver detalles de una película por ID
  { path: 'buscar/:texto', component: BuscarComponent }, // Ruta para buscar películas por texto

  { path: '', pathMatch: 'full', redirectTo: '/home' }, // Redirección por defecto a 'home'
  { path: '**', redirectTo: '/home' }, // Redirección para rutas no encontradas (404) a 'home'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importa y configura el módulo de rutas con las rutas definidas
  exports: [RouterModule], // Exporta el RouterModule para que esté disponible en toda la app
})
export class AppRoutingModule {} // Define el módulo de enrutamiento principal

// Este módulo maneja las rutas de la aplicación, permitiendo navegar entre diferentes componentes según la URL.
// Las rutas están definidas para la página principal, detalles de películas y búsqueda, con redirecciones para rutas no encontradas.
// El uso de 'pathMatch: full' asegura que la redirección solo ocurra si la URL es exactamente igual a la ruta vacía.
// El RouterModule se importa y configura con las rutas, y luego se exporta para que esté disponible en toda la aplicación.
// Este enfoque modular permite una mejor organización del código y facilita el mantenimiento y la escalabilidad de la aplicación.
// Además, el uso de parámetros en las rutas (como ':id' y ':texto') permite que los componentes reciban información dinámica basada en la URL, mejorando la experiencia del usuario al navegar por la aplicación.
// Este archivo es esencial para la navegación en la aplicación, permitiendo que los usuarios se desplacen entre diferentes vistas y funcionalidades de manera fluida.
// La estructura de rutas también facilita la implementación de características adicionales en el futuro, como la carga perezosa de módulos o la protección de rutas con guardias de autenticación.

//NOTA IMPRTANTE =================================================================================================
// El archivo app-routing.module.ts no se genera automáticamente al crear un nuevo proyecto Angular por defecto. Se crea solo si, al momento de crear el proyecto con Angular CLI, usaste el flag --routing, por ejemplo:

// ng new exampletmdb-main --routing

// Si no usaste este flag, tendrás que crear manualmente el archivo app-routing.module.ts y configurar las rutas de tu aplicación como se muestra arriba.
// Esto es importante porque el enrutamiento es una parte fundamental de las aplicaciones Angular, permitiendo la navegación entre diferentes componentes y vistas.
// Si no tienes este archivo, Angular no sabrá cómo manejar las rutas de tu aplicación, lo que puede llevar a errores al intentar navegar entre diferentes páginas o componentes.

//===============================================================================================================
