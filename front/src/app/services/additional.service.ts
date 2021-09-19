
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Additional } from '../models/Additional';

@Injectable({
  providedIn: 'root'
})
export class AdditionalService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  addAdditional(additional: Additional) {
    return this.http.post<any>(this.Url + "createAdditional", additional)
  }

  deleteAdditional(id: number) {
    return this.http.post<any>(this.Url + "deleteAdditional", id)
  }
}
