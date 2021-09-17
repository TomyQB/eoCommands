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
  extrasDisable = true
  extrasChecked: boolean[] = []

  constructor(private amountServices: AmountServicesService,private hashService: HashService, private location: Location, private totalObservableService: TotalObservableService) { }

  ngOnInit(): void {
    this.hash = this.hashService.getElementByName(this.amount.plate.name)
    this.amount.amount = this.hash.amount;
    this.amount.extras = this.hash.extras;
    this.calculateExtras()
    this.checkIfExtras()
    this.calculateSubTotal()
    this.showTextarea = this.amount.plate.drink
  }

  addToPedido(description: string) {

    this.amount.description = description
    // this.amount.subTotal = this.amount.amount * this.amount.plate.price

    this.totalObservableService.writeTotal(this.amountServices.addAmountToList(this.amount))

    this.hashService.setHashByName(this.amount.plate.name, this.amount.amount, description, this.amount.extras!);

    this.location.back();

  }

  add() {
    this.amount.amount++
    this.calculateSubTotal()
  }

  addExtra(additional: Additional){
    if(this.extrasDisable === false){

      if(this.amount.extras.findIndex(extra => extra.id === additional.id) >= 0) {
        for(let i = 0; i < this.amount.extras.length; i++) {
          if(this.amount.extras[i].id == additional.id){
            this.amount.extras.splice(i, 1)
          }
        }

        this.calculateSubTotalDeductExtras(additional.price)
      } else {
        this.amount.extras.push(additional)
        this.calculateSubTotalAddExtras(additional.price)
      }
    }
  }

  takeOut() {
    if(this.amount.amount > 0) {
      this.amount.amount--
      this.calculateSubTotal()
    }
  }

  calculateSubTotal() {
    this.amount.subTotal = this.amount.amount * this.amount.plate.price + this.extras
    if(this.amount.amount === 0) this.extrasDisable = true
    else this.extrasDisable = false
    this.roundSubTotal()
  }

  calculateExtras() {
    this.amount.extras.forEach(extra => {
      this.extras += extra.price
    });
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

  checkIfExtras(){
    this.extrasChecked = []

    this.amount.plate.additionals.map(extras => {
      if(this.amount.extras.findIndex(extra => extra.id === extras.id) >= 0){
        this.extrasChecked.push(true)
      } else {
        this.extrasChecked.push(false)
      }
    })
  }


}