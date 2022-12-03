import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RestaurantConfigurationService {
  Url = environment.Url;

  constructor(private http: HttpClient) {}

  getConfiguration(restaurantId: number) {
    return this.http.get<any>(this.Url + 'getConfig/' + restaurantId);
  }

  postConfiguration(config: any) {
    return this.http.post<any>(this.Url + 'saveConfig/', config);
  }
}
