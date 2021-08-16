import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalObservableService {

  private totalSubject = new Subject<number>()

  num: number = 0

  constructor() { }

  writeTotal(total: number) {
    total = Math.round(total * 100) / 100
    this.totalSubject.next(total)
  }

  clearTotal() {
    this.totalSubject.next()
  }

  getTotal(): number {
    this.totalSubject.subscribe(data => {
      this.num = data
      return this.num
    })
     return this.num
  }

}
