import { Observable } from 'rxjs';
import { PaymentIntentDTO } from './../models/PaymentIntentDTO';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment.prod';

import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  pay(paymentIntentDTO: PaymentIntentDTO) {
    return this.http.post<boolean>(this.Url + 'payment', paymentIntentDTO)
  }
}
