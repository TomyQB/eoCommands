import { PendingOrderService } from './../../services/pending-order.service';
import { ModalPhoneComponent } from './../modal-phone/modal-phone.component';
import { AmountServicesService } from './../../services/amount-services.service';
import { Pedido } from '../../models/Pedido';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { EmailService } from '../../services/email.service'
import { PedidoServicesService } from '../../services/pedido-services.service'
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HashService } from 'src/app/services/hash.service';
import { TotalObservableService } from 'src/app/services/total-observable.service';
import { CurrencySumbolService } from 'src/app/services/currency-sumbol.service';

declare var require: any

@Component({
  selector: 'app-pedido-info',
  templateUrl: './pedido-info.component.html',
  styleUrls: ['./pedido-info.component.scss']
})
export class PedidoInfoComponent implements OnInit {
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
  prefixs = [
    {value: '+34', viewValue: 'ES (+34)'},
    {value: '+44', viewValue: 'UK (+44)'},
    {value: '+507', viewValue: 'PAN (+507)'},
  ];

  public showOverlay = false;

  restaurantName: string = sessionStorage.getItem("name")!;

  dialogConfig: MatDialogConfig = {
    width: '90%',
  }

  pedido: Pedido = {
    numTable: -1,
    email: "",
    restaurantId: parseInt(sessionStorage.getItem("idRestaurant")!),
    total: history.state.total,
    date: "",
    phoneNumber: "",
    estadoFood: "Pendiente",
    estadoDrink: "Pendiente",
    amounts: this.amountServices.amounts
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  tableFormControl = new FormControl('', [
    Validators.required,
  ]);

  prefixFormControl = new FormControl('', [
    Validators.required,
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
  ]);


  constructor(public currencySumbolService: CurrencySumbolService, private pedidoService: PedidoServicesService, private pendingOrderService: PendingOrderService, public dialog: MatDialog, private amountServices: AmountServicesService, private router: Router,
    private emailService: EmailService, private hash: HashService, private totalObservableService: TotalObservableService) { }

  ngOnInit(): void {
    let count = this.pedidoService.countFoodAndDrink(this.pedido.amounts!)
    this.pedido.foodCount = count[0]
    this.pedido.drinkCount = count[1]
  }

  finishPedido() {
    this.showOverlay = true
    this.pedido.date = this.getHour()
    this.sendOrder();

  }

  sendOrder(){
    this.pedidoService.madePedido(this.pedido).subscribe(data => {
      if(data) {
        this.pendingOrderService.madePendingOrder(this.pedido).subscribe(data2 => {
          if(data2 = true) {
            const name = sessionStorage.getItem("name")
            this.hash.dic = {}
            this.totalObservableService.writeTotal(0)
            this.amountServices.amounts = []
            this.showOverlay = false
            this.router.navigateByUrl("/confirmacion", {state: {nameRest: name}});
          }
        })
      }
    })
  }

  getHour() {
    let dateFormat = require('dateformat');
    let now = new Date()
    return dateFormat(now, "h:MM");
  }

  openDialog() {
    this.pedido.email = this.emailFormControl.value
    this.pedido.numTable = this.tableFormControl.value
    if(this.phoneFormControl.value && this.prefixFormControl)
      this.pedido.phoneNumber = this.prefixFormControl.value + this.phoneFormControl.value

    if(this.pedido.email && this.pedido.numTable && !isNaN(this.pedido.numTable)) {
      this.showOverlay = true
      this.emailService.sendMessage(this.pedido.email).subscribe(data => {
        this.showOverlay = false
        const dialogRef = this.dialog.open(ModalPhoneComponent, this.dialogConfig)
        dialogRef.componentInstance.code = data
        dialogRef.afterClosed().subscribe(res => {
          if(res) {
            this.finishPedido()
          }
        })
      })
    } else alert("Rellena todos los campos correctamente")

  }

  goCategoriesPage() {
    this.router.navigateByUrl("/restaurant/menu/" + sessionStorage.getItem("name"));
  }

}
