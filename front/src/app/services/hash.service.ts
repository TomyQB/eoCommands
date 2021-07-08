import { DescAndAmount } from './../models/DescAndAmount';
import { Injectable } from '@angular/core';
import { Plate } from '../models/Plate';

@Injectable({
  providedIn: 'root'
})
export class HashService {

  public dic: {[key: string]: DescAndAmount} = {}

  constructor() { }

  public createDictionary(plates: Plate[]) {
    for(let p of plates) {
      if(!(p.name in this.dic)) {
        this.dic[p.name] = {amount: 0, description: ""}
      }
    }
  }

  public getElementByName(name: string) {
    return this.dic[name]
  }

  public getElement() {
    return this.dic
  }

  public setHashByName(name: string, amount: number, description: string) {
    this.dic[name] = {amount: amount, description: description}
  }

}
