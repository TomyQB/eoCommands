import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Amount } from '../models/Amount';
import { PRINCIPAL, ENTRANTE } from '../constants/plate-type';

@Injectable({
  providedIn: 'root',
})
export class AmountServicesService {
  public amounts: any[] = [];

  public entrante: any[] = [];
  public principal: any[] = [];

  Url = environment.Url;

  constructor(private http: HttpClient) {}

  changeEstadoAmount(amount: Amount) {
    return this.http.post<any>(this.Url + 'changeEstadoAmount', amount);
  }

  public addAmountToList(amount: Amount) {
    if (amount.type === ENTRANTE) {
      this.entrante.push(amount);
    } else if (amount.type === PRINCIPAL) {
      this.principal.push(amount);
    }
    console.log(amount);
    if (this.amounts.length > 0) {
      if (!this.comprobateAmountExist(amount)) {
        this.amounts.push(amount);
      }
    } else {
      this.amounts.push(amount);
    }

    return this.calculateTotal();
  }

  private comprobateAmountExist(amount: Amount) {
    let repeAmount: Amount;
    let exist: boolean = false;

    for (let i = 0; i < this.amounts.length; i++) {
      if (this.amounts[i].plate!.name == amount.plate!.name) {
        repeAmount = this.amounts[i];
        exist = true;

        if (amount.amount > 0) {
          this.updateAmount(amount, i);
        } else if (amount.amount == 0) {
          this.deleteAmount(i);
        }
      }
    }

    return exist;
  }

  private deleteAmount(index: number) {
    this.amounts.splice(index, 1);
  }

  private updateAmount(amount: Amount, index: number) {
    this.deleteAmount(index);
    this.amounts.push(amount);
  }

  private calculateTotal() {
    let total: number = 0;

    this.entrante.forEach((element) => {
      total += element.subTotal;
    });

    this.principal.forEach((element) => {
      total += element.subTotal;
    });

    return total;
  }
}
