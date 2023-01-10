import { Pedido } from '../../models/Pedido';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PendingOrderService } from '../../services/pending-order.service';
import { ModalPhoneComponent } from '../modal-phone/modal-phone.component';
import { AmountServicesService } from '../../services/amount-services.service';
import { EmailService } from '../../services/email.service';
import { PedidoServicesService } from '../../services/pedido-services.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HashService } from 'src/app/services/hash.service';
import { TotalObservableService } from 'src/app/services/total-observable.service';
import { CurrencySumbolService } from 'src/app/services/currency-sumbol.service';
import { ENTRANTE, PRINCIPAL } from '../../constants/plate-type';
import {
  ALWAYS,
  FIRST_TIME,
  NEVER,
} from '../../constants/restaurant-configuration';

import { RestaurantService } from '../../services/restaurant.service';

declare var require: any;

@Component({
  selector: 'app-pedido-info',
  templateUrl: './pedido-info.component.html',
  styleUrls: ['./pedido-info.component.scss'],
})
export class PedidoInfoComponent implements OnInit {
  public always = ALWAYS;
  entrante: any[] = [];
  principal: any[] = [];
  bebida: any[] = [];
  numMesa = '';
  firstTime = false;
  total = 0;

  dropEntrante(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.entrante[event.currentIndex].type = ENTRANTE;
    }
  }

  dropPrincipal(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.principal[event.currentIndex].type = PRINCIPAL;
    }
  }

  public showOverlay = false;

  restaurantName: string = sessionStorage.getItem('name')!;

  dialogConfig: MatDialogConfig = {
    width: '90%',
  };

  pedido: Pedido = {
    numTable: parseInt(sessionStorage.getItem('tableNum')!),
    email: '',
    restaurantId: parseInt(sessionStorage.getItem('idRestaurant')!),
    // total: history.state.total,
    total: this.total,
    date: '',
    estadoFood: 'Pendiente',
    estadoDrink: 'Pendiente',
    amounts: this.amountServices.entrante.concat(
      this.amountServices.principal,
      this.amountServices.bebida
    ),
  };

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  tableFormControl = new FormControl('', [Validators.required]);

  constructor(
    public currencySumbolService: CurrencySumbolService,
    public restaurantService: RestaurantService,
    private pedidoService: PedidoServicesService,
    private pendingOrderService: PendingOrderService,
    public dialog: MatDialog,
    private amountServices: AmountServicesService,
    private router: Router,
    private emailService: EmailService,
    private hash: HashService,
    private totalObservableService: TotalObservableService
  ) {}

  ngOnInit(): void {
    let count = this.pedidoService.countFoodAndDrink(this.pedido.amounts!);
    this.pedido.foodCount = count[0];
    this.pedido.drinkCount = count[1];
    this.entrante = this.amountServices.entrante;
    this.principal = this.amountServices.principal;
    this.bebida = this.amountServices.bebida;
    this.numMesa = sessionStorage.getItem('tableNum')!;
    if (this.restaurantService.mailConfiguration === FIRST_TIME) {
      this.pedidoService
        .checkFirstOrder(
          parseInt(sessionStorage.getItem('idRestaurant')!),
          parseInt(sessionStorage.getItem('tableNum')!)
        )
        .subscribe((res) => {
          this.firstTime = res;
        });
    }
  }

  totals() {
    this.total = 0;
    this.amountServices.entrante?.forEach((plato: any) => {
      this.total = this.total + plato.plate.price * plato.amount;
      plato.extras.forEach((ext: any) => (this.total = this.total + ext.price));
    });

    this.amountServices.principal?.forEach((plato: any) => {
      this.total = this.total + plato.plate.price * plato.amount;
      plato.extras.forEach((ext: any) => (this.total = this.total + ext.price));
    });
    this.amountServices.bebida?.forEach((plato: any) => {
      this.total = this.total + plato.plate.price * plato.amount;
    });
    this.total = Math.round((this.total + Number.EPSILON) * 100) / 100;

    return this.total;
  }

  finishPedido() {
    this.showOverlay = true;
    this.pedido.date = this.getHour();
    this.sendOrder();
  }

  sendOrder() {
    this.pedidoService.madePedido(this.pedido).subscribe((data) => {
      if (data) {
        this.pendingOrderService
          .madePendingOrder(this.pedido)
          .subscribe((data2) => {
            if ((data2 = true)) {
              const name = sessionStorage.getItem('name');
              this.hash.dic = {};
              this.totalObservableService.writeTotal(0);
              this.amountServices.amounts = [];
              this.amountServices.entrante = [];
              this.amountServices.principal = [];
              this.amountServices.bebida = [];
              this.showOverlay = false;
              this.router.navigateByUrl('/confirmacion', {
                state: { nameRest: name },
              });
            }
          });
      }
    });
  }

  getHour() {
    let dateFormat = require('dateformat');
    let now = new Date();
    return dateFormat(now, 'h:MM');
  }

  openDialog() {
    this.pedido.total = this.total;
    this.pedido.email = this.emailFormControl.value;
    if (!this.firstTime || this.restaurantService.mailConfiguration === NEVER) {
      this.finishPedido();
    } else {
      if (this.pedido.email) {
        this.showOverlay = true;
        this.emailService.sendMessage(this.pedido.email).subscribe((data) => {
          this.showOverlay = false;
          const dialogRef = this.dialog.open(
            ModalPhoneComponent,
            this.dialogConfig
          );
          dialogRef.componentInstance.code = data;
          dialogRef.afterClosed().subscribe((res) => {
            if (res) {
              this.finishPedido();
            }
          });
        });
      } else alert('Rellena todos los campos correctamente');
    }
  }

  goCategoriesPage() {
    this.router.navigateByUrl(
      '/restaurant/menu/' + sessionStorage.getItem('name')
    );
  }
}
