import { Injectable } from '@angular/core';

// Este servicio se encarga de almacenar y recuperar datos del almacenamiento local, de sesion, de navegador, etc.
// Puede ser utilizado para guardar configuraciones, preferencias del usuario, o cualquier otro dato que necesite persistencia.
// Puedes agregar métodos para setear y obtener datos del almacenamiento local o de sesión, por ejemplo:
// setItem(key: string, value: any): void {
//   localStorage.setItem(key, JSON.stringify(value));
// }
// getItem(key: string): any {
//   const value = localStorage.getItem(key);
//   return value ? JSON.parse(value) : null;
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
}
