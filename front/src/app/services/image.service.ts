import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  getImages() {
    return this.http.get<any>(this.Url + "getImages")
  }
}
