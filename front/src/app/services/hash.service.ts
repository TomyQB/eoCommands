import { Injectable } from '@angular/core';
import { Plate } from '../models/Plate';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  dic: {[key: string]: number} = {}

  constructor() { }

  public createDictionary(plates: Plate[]) {
    for(let p of plates) {
      if(!(p.name in this.dic)) {
        this.dic[p.name] = 0
      }
    }
  }

  public getElementByName(name: string) {
    return this.dic[name]
  }

  public getElement() {
    return this.dic
  }

  public setAmountByName(name: string, amount: number) {
    this.dic[name] = amount
  }
}
