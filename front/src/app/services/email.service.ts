import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  Url = environment.Url

  constructor(private http: HttpClient) { }

  sendMessage(email: string) {
    return this.http.post<number>(this.Url + "code", email)
  }
}
