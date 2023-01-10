import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';
import { CurrencySumbolService } from '../../../../services/currency-sumbol.service';
@Component({
  selector: 'app-separar-mesa',
  templateUrl: './separar-mesa.component.html',
  styleUrls: ['./separar-mesa.component.scss'],
})
export class SepararMesaComponent implements OnInit {
  cuentaDividida = <any>[];
  cuentaCompleta = <any>[];
  cuenta = [];
  constructor(
    private pedidoServices: PedidoServicesService,
    public currencySumbolService: CurrencySumbolService
  ) {}

  ngOnInit(): void {
    this.cuenta = JSON.parse(
      JSON.stringify(this.pedidoServices.pedidosParaSeparar)
    );

    this.cuenta.forEach((pedido: any) => {
      this.cuentaCompleta = this.cuentaCompleta.concat(pedido.amounts);
    });

    this.fillCuenta();
  }

  fillCuenta() {
    for (let i = 0; this.cuentaCompleta.length > i; i++) {
      let extras: any = [];
      if (this.cuentaCompleta[i].amount > 1) {
        this.cuentaCompleta[i].extras.forEach((extra: any) => {
          if (extra.amount > 1) {
            extra.amount--;
            extras.push(extra);
          }
        });
        this.cuentaCompleta.push({
          ...this.cuentaCompleta[i],
          amount: this.cuentaCompleta[i].amount - 1,
          extras,
        });
        this.cuentaCompleta[i].amount--;
      }

      if (this.cuentaCompleta[i].plate) {
        let subTotal =
          this.cuentaCompleta[i].amount * this.cuentaCompleta[i].plate.price;

        this.cuentaCompleta[i].extras.forEach((extra: any) => {
          subTotal = extra.price + subTotal;
        });
        subTotal = Math.round((subTotal + Number.EPSILON) * 100) / 100;

        this.cuentaCompleta[i].subTotal = subTotal;
      }
    }
  }

  printCuenta() {
    // let isCorrectTableNum = this.pendingOrders.find(
    //   (order: any) => order.tableNum == this.tableNum
    // );
    // if (this.tableNum != '' && isCorrectTableNum) {
    //   this.pedidos[0].restaurantId = JSON.parse(sessionStorage.getItem('restaurant')!).id
    //   this.pedidos[0].numTable = this.tableNum
    //   let text = ""
    //   this.printerService.generateBodyCuenta(this.pedidos).subscribe((body: any) => {
    //     text = text.concat(body.text)
    //     text = text.concat(this.generateFooder())
    //     let printers = this.printers.filter((e: any) =>
    //       e.type.includes('cuenta')
    //     );
    //     for (let printer of printers) {
    //       this.printerService.print(printer.name, text).subscribe(() => {})
    //     }
    //   })
    // } else alert('Selecciona una mesa existente');
  }

  dropCuentaCompleta(event: CdkDragDrop<string[]>) {
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
    }
  }

  dropCuentaDividida(event: CdkDragDrop<string[]>) {
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
    }
  }

  total() {
    let total = 0;
    this.cuentaCompleta.map((plato: any) => {
      total = total + plato.subTotal;
    });
    total = Math.round((total + Number.EPSILON) * 100) / 100;
    return total;
  }

  totalDividida() {
    let total = 0;
    this.cuentaDividida.map((plato: any) => {
      total = total + plato.subTotal;
    });
    total = Math.round((total + Number.EPSILON) * 100) / 100;
    return total;
  }
}
