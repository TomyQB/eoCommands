import { Pedido } from 'src/app/models/Pedido';
import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';
import { CurrencySumbolService } from '../../../../services/currency-sumbol.service';
import { formatDate } from '@angular/common';
import { PrinterService } from 'src/app/services/printer/printerv1.service';
@Component({
  selector: 'app-separar-mesa',
  templateUrl: './separar-mesa.component.html',
  styleUrls: ['./separar-mesa.component.scss'],
})
export class SepararMesaComponent implements OnInit {
  cuentaDividida = <any>[];
  cuentaCompleta = <any>[];
  cuenta = [];
  printers: any;

  constructor(
    private pedidoServices: PedidoServicesService,
    public currencySumbolService: CurrencySumbolService,
    private printerService: PrinterService
  ) {}

  ngOnInit(): void {
    this.printers = this.printerService.printers;
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
    let cuenta = Object.assign(this.cuenta[0]);
    cuenta.total = this.totalDividida();
    console.log(cuenta);
    console.log(this.cuentaDividida);
    // Trabajar sobre cuentaToPrint para imprimir, aunque comprueba antes por si acaso falta algo o algo está mal
    const cuentaToPrint: Pedido = { ...cuenta, amounts: this.cuentaDividida };

    cuentaToPrint.restaurantId = JSON.parse(
      sessionStorage.getItem('restaurant')!
    ).id;
    // cuentaToPrint.numTable = cuentaToPrint.tableNum;
    console.log(cuentaToPrint);
    let text = '';
    this.printerService
      .generateBodyCuenta([cuentaToPrint])
      .subscribe((body: any) => {
        text = text.concat(body.text);
        text = text.concat(this.generateFooder());
        let printers = this.printers.filter((e: any) =>
          e.type.includes('cuenta')
        );
        for (let printer of printers) {
          this.printerService.print(printer.name, text).subscribe(() => {
            this.cuentaDividida = [];
          });
        }
      });
  }

  private generateFooder() {
    let fooder = '';
    fooder = fooder.concat(
      '\n' + 'TOTAL CON IVA INCLUIDO        ' + this.totalDividida() + '\n'
    );
    fooder = fooder.concat(
      '================================================\n'
    );
    let currentDate = new Date();
    const dateFormat = formatDate(currentDate, 'dd-MM-yyyy', 'en-ES');
    fooder = fooder.concat('FECHA: ' + dateFormat + '\n');
    fooder = fooder.concat('Gracias por todo, le esperamos pronto!\n');
    return fooder;
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
