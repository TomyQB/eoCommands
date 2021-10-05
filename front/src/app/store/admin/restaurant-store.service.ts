import { Restaurant } from './../../models/Restaurant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantStoreService {

  restaurant!: Restaurant

  constructor() { }
}
