import { Additional } from './../../models/Additional';
import { AmountServicesService } from './../../services/amount-services.service';
import { TotalObservableService } from './../../services/total-observable.service';
import { DescAndAmount } from './../../models/DescAndAmount';
import { Amount } from './../../models/Amount';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

import { HashService } from '../../services/hash.service'

@Component({
  selector: 'app-plate-info',
  templateUrl: './plate-info.component.html',
  styleUrls: ['./plate-info.component.scss']
})
export class PlateInfoComponent implements OnInit {

  hash!: DescAndAmount
  showTextarea = false;

  amount: Amount = {
    amount: 0,
    description: "",
    subTotal: 0,
    plate: history.state.plate,
    extras: []
  }

  extras = 0
  first = true


  constructor(private amountServices: AmountServicesService,private hashService: HashService, private location: Location, private totalObservableService: TotalObservableService) { }

  ngOnInit(): void {
    this.hash = this.hashService.getElementByName(this.amount.plate.name)
    this.amount.amount = this.hash.amount;
    this.calculateSubTotal()
    this.showTextarea = this.amount.plate.drink
  }

  addToPedido(description: string) {

    this.amount.description = description
    // this.amount.subTotal = this.amount.amount * this.amount.plate.price

    this.totalObservableService.writeTotal(this.amountServices.addAmountToList(this.amount))

    this.hashService.setHashByName(this.amount.plate.name, this.amount.amount, description)

    this.location.back();

  }

  add() {
    this.amount.amount++
    this.calculateSubTotal()
  }

  addExtra(additional: Additional){
    if(this.amount.extras?.includes(additional)) {
      this.amount.extras.splice(this.amount.extras?.indexOf(additional, 0), 1)
      this.calculateSubTotalDeductExtras(additional.price)
    } else {
      this.amount.extras?.push(additional)
      this.calculateSubTotalAddExtras(additional.price)
    }
    console.log(this.amount.extras);

  }

  takeOut() {
    if(this.amount.amount > 0) {
      this.amount.amount--
      this.calculateSubTotal()
    }
  }

  calculateSubTotal() {
    this.amount.subTotal = this.amount.amount * this.amount.plate.price + this.extras
    this.roundSubTotal()
  }


  calculateSubTotalAddExtras(price: number) {
    this.extras += price
    this.calculateSubTotal()
  }

  calculateSubTotalDeductExtras(price: number) {
    this.extras -= price
    this.calculateSubTotal()
  }

  roundSubTotal(){
    this.amount.subTotal = Math.round(this.amount.subTotal * 100) / 100
  }


}
