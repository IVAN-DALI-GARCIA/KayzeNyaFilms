// Generated by https://quicktype.io esta aplicacon para generar interfaces de TypeScript a partir de JSON

// Interface principal que representa el detalle de una película
export interface MovieDetails {
  adult: boolean; // Indica si la película es para adultos
  backdrop_path: string; // Ruta de la imagen de fondo
  belongs_to_collection: null; // Colección a la que pertenece (puede ser null)
  budget: number; // Presupuesto de la película
  genres: Genre[]; // Lista de géneros
  homepage: string; // Página web oficial
  id: number; // ID único de la película
  imdb_id: string; // ID de IMDb
  original_language: string; // Idioma original
  original_title: string; // Título original
  overview: string; // Sinopsis
  popularity: number; // Popularidad
  poster_path: string; // Ruta del póster
  production_companies: ProductionCompany[]; // Compañías productoras
  production_countries: ProductionCountry[]; // Países de producción
  release_date: string; // Fecha de estreno
  revenue: number; // Recaudación
  runtime: number; // Duración en minutos
  spoken_languages: SpokenLanguage[]; // Idiomas hablados
  status: string; // Estado (Released, etc.)
  tagline: string; // Lema o frase promocional
  title: string; // Título de la película
  video: boolean; // Indica si tiene video
  vote_average: number; // Promedio de votos
  vote_count: number; // Cantidad de votos
}

// Interface para los géneros de la película
export interface Genre {
  id: number; // ID del género
  name: string; // Nombre del género
}

// Interface para las compañías productoras
export interface ProductionCompany {
  id: number; // ID de la compañía
  logo_path: null | string; // Ruta del logo (puede ser null)
  name: string; // Nombre de la compañía
  origin_country: string; // País de origen
}

// Interface para los países de producción
export interface ProductionCountry {
  iso_3166_1: string; // Código ISO del país
  name: string; // Nombre del país
}

// Interface para los idiomas hablados en la película
export interface SpokenLanguage {
  english_name: string; // Nombre en inglés
  iso_639_1: string; // Código ISO del idioma
  name: string; // Nombre del idioma
}
