import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo de Angular
import { BrowserModule } from '@angular/platform-browser'; // Importa el módulo necesario para aplicaciones web
import { HttpClientModule } from '@angular/common/http'; // Permite realizar peticiones HTTP

import { AppRoutingModule } from './app-routing.module'; // Módulo de rutas de la aplicación
import { AppComponent } from './app.component'; // Componente raíz de la aplicación
import { NavbarComponent } from './components/navbar/navbar.component'; // Componente de la barra de navegación
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component'; // Componente para volver al inicio de la página

@NgModule({
  // Declaraciones de componentes que pertenecen a este módulo
  declarations: [
    AppComponent, // Solo se declara el componente raíz, los demás son standalone
  ],
  // Importación de otros módulos y componentes standalone necesarios
  imports: [
    BrowserModule, // Necesario para que la app funcione en el navegador
    AppRoutingModule, // Manejo de rutas
    HttpClientModule, // Permite el uso de HttpClient para peticiones HTTP
    NavbarComponent, // Componente standalone de la barra de navegación
    ScrollToTopComponent, // Componente standalone para scroll al inicio
  ],
  providers: [], // Servicios globales (vacío en este caso)
  bootstrap: [AppComponent], // Componente principal que se inicia al arrancar la app
})
export class AppModule {} // Definición de la clase del módulo principal
