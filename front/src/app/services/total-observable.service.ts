import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalObservableService {

  private totalSubject = new Subject<number>()

  constructor() { }

  writeTotal(total: number) {
    this.totalSubject.next(total)
  }

  clearTotal() {
    this.totalSubject.next()
  }

  getTotal(): Observable<number> {
    return this.totalSubject.asObservable()
  }
}
