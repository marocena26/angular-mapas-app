import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public useLocation?: [number, number]; // Dónde me encuentro (longitud, latitud)

  // sabremos si el useLocation tiene un valor o no, hacemos doble negación para decir que sí que hay un valor, si existe
  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor() {
    this.getUserLocation();
  }

  // me devuelve ls localización (longitud, latitud), convertimos en una promesa

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalización');
          console.log(err);
          reject();
        }
      );
    });
  }
}
