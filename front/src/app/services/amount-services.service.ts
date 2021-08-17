import { Injectable } from '@angular/core';
import { Amount } from '../models/Amount';

@Injectable({
  providedIn: 'root'
})
export class AmountServicesService {

  public amounts: Amount[] = []

  constructor() { }

  public addAmountToList(amount: Amount) {
    if(this.amounts.length > 0) {
        if(!this.comprobateAmountExist(amount)) {
          this.amounts.push(amount);
        }
    } else {
      this.amounts.push(amount);
    }
    console.log(this.amounts);

    return this.calculateTotal();
}

  private comprobateAmountExist(amount: Amount) {
      let repeAmount: Amount
      let exist: boolean = false

      for(let i = 0; i < this.amounts.length; i++){
        if(this.amounts[i].plate.name == amount.plate.name) {
          repeAmount = this.amounts[i];
          exist = true;

          if(amount.amount > 0) {
            this.updateAmount(amount, i);
          } else if(amount.amount == 0) {
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

    this.amounts.forEach(element => {
      total += element.subTotal
    });

    return total;
}

}
