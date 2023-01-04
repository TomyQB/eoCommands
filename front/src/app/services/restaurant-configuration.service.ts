import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantConfigurationService {
  Url = environment.Url;
  restaurantConfigObservable: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  restaurantConfig = JSON.parse(sessionStorage.getItem('restaurantConfig')!);

  constructor(private http: HttpClient) {}

  // getRestaurantConfigObservable() {
  //   return this.restaurantConfigObservable();
  // }

  setSharingObservableData(data: any) {
    this.restaurantConfigObservable.next(data);
  }

  getConfiguration(restaurantId: number) {
    return this.http.get<any>(this.Url + 'getConfig/' + restaurantId);
  }

  postConfiguration(config: any) {
    return this.http.post<any>(this.Url + 'saveConfig/', config);
  }
}
