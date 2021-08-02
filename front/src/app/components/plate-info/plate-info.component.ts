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

  amount: Amount = {
    amount: 0,
    description: "",
    subTotal: 0,
    plate: history.state.plate
  }



  constructor(private amountServices: AmountServicesService,private hashService: HashService, private location: Location, private totalObservableService: TotalObservableService) { }

  ngOnInit(): void {
    this.hash = this.hashService.getElementByName(this.amount.plate.name)
    this.amount.amount = this.hash.amount
  }

  addToPedido(description: string) {

    this.amount.description = description
    this.amount.subTotal = this.amount.amount * this.amount.plate.price

    this.totalObservableService.writeTotal(this.amountServices.addAmountToList(this.amount))

    this.hashService.setHashByName(this.amount.plate.name, this.amount.amount, description)

    this.location.back();

  }

  add() {
    this.amount.amount++
  }

  takeOut() {
    if(this.amount.amount > 0) {
      this.amount.amount--
    }
  }

  writting(event: any) {
    this.amount.description = event
  }

}
