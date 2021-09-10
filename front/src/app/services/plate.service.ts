import { PlateDTO } from './../models/PlateDTO';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PlateService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  addPlate(plate: PlateDTO) {
    return this.http.post<any>(this.Url + "createPlate", plate)
  }

  updatePlate(plate: PlateDTO) {
    return this.http.post<any>(this.Url + "updatePlate", plate)
  }

  deletePlate(id: number) {
    return this.http.post<any>(this.Url + "deletePlate", id)
  }
}
