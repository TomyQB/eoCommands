import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  Url = environment.Url;

  constructor(private http: HttpClient) {}

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  checkGeolocation(payload: any) {
    return this.http.get<any>(
      this.Url +
        'checkGeolocation/' +
        payload.id +
        '/' +
        payload.latitude +
        '/' +
        payload.longitude
    );
  }
}
