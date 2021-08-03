import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  sendSMS(phone: string) {
    return this.http.post<number>(this.Url + "sms", phone)
  }
}
