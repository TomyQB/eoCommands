import { WhatsAppDTO } from './../../../models/WhatsAppDTO';
import { WhatsappService } from './../../../services/whatsapp.service';
import { TotalOrdersRecordService } from './../../../services/total-orders-record.service';
import { PedidoServicesService } from './../../../services/pedido-services.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Pedido } from 'src/app/models/Pedido';
import { PendingOrderService } from 'src/app/services/pending-order.service';
import { PendingOrdersRecord } from 'src/app/models/PendingOrdersRecord';
import { CurrencySumbolService } from 'src/app/services/currency-sumbol.service';
import { PrinterService } from 'src/app/services/printer/printer.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-tab-cuenta',
  templateUrl: './tab-cuenta.component.html',
  styleUrls: ['./tab-cuenta.component.scss'],
})
export class TabCuentaComponent implements OnInit {
  @Input() pendingOrders: any;
  @Output() pedidosOutput = new EventEmitter<String>();

  urlWhatsapp: string = '';
  disableUrl: string = 'disable';

  tableFormControl = new FormControl('', [Validators.required]);

  pedidoDelete: Pedido = {
    date: '',
    email: '',
    numTable: 0,
    restaurantId: JSON.parse(sessionStorage.getItem('restaurant')!).id,
    total: 0,
  };

  whatsAppDTO: WhatsAppDTO = {
    restaurantId: JSON.parse(sessionStorage.getItem('restaurant')!).id,
    tableNum: 0,
  };

  total: number = 0;
  tableNum: string = '';

  printers!: any;

  constructor(
    public currencySumbolService: CurrencySumbolService,
    private pendingOrderService: PendingOrderService,
    private pedidoServices: PedidoServicesService,
    private totalOrdersRecordService: TotalOrdersRecordService,
    private whatsappService: WhatsappService,
    private printerService: PrinterService
  ) {}

  ngOnInit(): void {
    this.printers = this.printerService.printers;

    this.getPendingOrders();

    setInterval(() => {
      if (this.tableNum == '') this.getPendingOrders();
      else this.filtrarPendigOrdersByNumTable(this.tableNum);
    }, 300000);
  }

  calculateTotal() {
    this.total = 0;
    for (let i = 0; i < this.pendingOrders.length; i++) {
      let amount = this.pendingOrders[i].amount;
      let price = this.pendingOrders[i].additional
        ? this.pendingOrders[i].additional.price
        : this.pendingOrders[i].plate.price;
      let additionals = 0;
      if (
        this.pendingOrders[i].plate &&
        this.pendingOrders[i].plate.additionals.length > 0
      ) {
        for (let additional of this.pendingOrders[i].plate.additionals) {
          additionals += additional.price;
        }
      }
      this.total += amount * price + additionals;
      this.total = Math.round(this.total * 100) / 100;
    }
  }

  getPendingOrders() {
    this.pendingOrderService
      .getAllPendingOrder(this.pedidoDelete.restaurantId)
      .subscribe((data) => {
        this.pendingOrders = data;
        this.calculateTotal();
        sessionStorage.setItem('pendingOrders', JSON.stringify(data));
      });
  }

  getPendingByTable() {
    if (this.tableNum == '') {
      this.whatsappService.message = '';
      this.disableUrl = 'disable';
      this.getPendingOrders();
    } else {
      this.filtrarPendigOrdersByNumTable(this.tableNum);
      this.disableUrl = '';
    }
  }

  private filtrarPendigOrdersByNumTable(tableNum: string) {
    let i = 0;
    while (i < this.pendingOrders.length) {
      if (this.pendingOrders[i].tableNum != parseInt(tableNum))
        this.pendingOrders.splice(i, 1);
      else i++;
    }
    this.calculateTotal();
  }

  /*prepareMessage() {
    this.whatsAppDTO.tableNum = parseInt(this.tableNum)
    this.pedidoServices.enviarCuentaWhatsapp(this.whatsAppDTO).subscribe(data => {
      this.whatsappService.singletonMessage(this.pendingOrders, this.total, data)
      this.urlWhatsapp = this.whatsappService.message
    })
  }*/

  printCuenta() {
    console.log(this.printers);
    this.printerService.initPrint();
    let isCorrectTableNum = this.pendingOrders.find(
      (order: any) => order.tableNum == this.tableNum
    );
    if (this.tableNum != '' && isCorrectTableNum) {
      this.printerService.establecerEnfatizado(1);
      this.printerService.establecerJustificacion(
        PrinterService.Constantes.AlineacionCentro
      );
      this.printerService.write(
        'RESTAURANTE ' +
          JSON.parse(sessionStorage.getItem('restaurant')!).name +
          '\n\n'
      );
      this.printerService.write('MESA ' + this.tableNum + '\n\n');
      this.printerService.write(
        '------------------------------------------------' + '\n'
      );
      this.printerService.write(
        'DESCRIPCION                 UNID.  PRECIO  TOTAL' + '\n'
      );
      this.printerService.write(
        '================================================' + '\n'
      );
      this.printerService.establecerJustificacion(
        PrinterService.Constantes.AlineacionIzquierda
      );
      for (let pedido of this.pendingOrders) {
        if (pedido.plate) {
          if (pedido.plate.name.length > 30) {
            pedido.plate.name = pedido.plate.name.substring(0, 30);
          }
          let description = pedido.plate.name.concat(
            ' '.repeat(31 - pedido.plate.name.length)
          );
          let repeater =
            7 - pedido.plate.price.toString().length <= 0
              ? 0
              : 7 - pedido.plate.price.toString().length;
          let priceSpace = ' '.repeat(repeater);
          this.printerService.write(
            description +
              pedido.amount +
              '   ' +
              pedido.plate.price +
              '€' +
              priceSpace +
              pedido.plate.price * pedido.amount +
              '€' +
              '\n'
          );
          if (pedido.plate.additionals.length > 0) {
            this.printerService.establecerJustificacion(
              PrinterService.Constantes.AlineacionDerecha
            );
            for (let additional of pedido.plate.additionals) {
              let description = additional.name.concat(
                ' '.repeat(31 - additional.name.length)
              );
              this.printerService.write(
                description + additional.price + '€' + '\n'
              );
            }
            this.printerService.establecerJustificacion(
              PrinterService.Constantes.AlineacionIzquierda
            );
          }
        } else if (pedido.additional) {
          if (pedido.additional.name.length > 30) {
            pedido.additional.name = pedido.additional.name.substring(0, 30);
          }
          let description = pedido.additional.name.concat(
            ' '.repeat(31 - pedido.additional.name.length)
          );
          let repeater =
            7 - pedido.additional.price.toString().length < 0
              ? 0
              : 7 - pedido.additional.price.toString().length;
          let priceSpace = ' '.repeat(repeater);
          this.printerService.write(
            description +
              pedido.amount +
              '   ' +
              pedido.additional.price +
              '€' +
              priceSpace +
              pedido.additional.price * pedido.amount +
              '€' +
              '\n'
          );
        }
      }
      this.printerService.establecerJustificacion(
        PrinterService.Constantes.AlineacionIzquierda
      );
      this.printerService.write('\n' + 'TOTAL CON IVA INCLUIDO        ');
      this.printerService.establecerJustificacion(
        PrinterService.Constantes.AlineacionDerecha
      );
      this.printerService.write(this.total + '€' + '\n');
      this.printerService.establecerJustificacion(
        PrinterService.Constantes.AlineacionCentro
      );
      this.printerService.write(
        '================================================' + '\n'
      );
      let currentDate = new Date();
      const dateFormat = formatDate(currentDate, 'dd-MM-yyyy', 'en-ES');
      this.printerService.write('FECHA: ' + dateFormat + '\n');
      this.printerService.write(
        'Gracias por todo, le esperamos pronto!' + '\n'
      );

      let printers = this.printers
        .filter((e: string) => e.includes('cuenta'))
        .toString();
      console.log(printers);
      this.print(printers);
      /*for (let printer of printers) {
        this.print(printer);
      }*/
    } else alert('Selecciona una mesa existente');
  }

  async print(printerName: string | undefined) {
    this.printerService.partialCut();
    await this.printerService
      .imprimirEn(printerName)
      .then((respuestaAlImprimir) => {
        if (respuestaAlImprimir === true) {
          console.log('Impreso correctamente');
          this.printerService.limpiarImpresora();
        } else {
          console.log('Error. La respuesta es: ' + respuestaAlImprimir);
          this.printerService.limpiarImpresora();
        }
      });
  }

  deleteCuenta() {
    if (this.tableNum != '') {
      this.pedidosOutput.emit('fin');
      this.pedidoDelete.numTable = parseInt(this.tableNum);
      this.updateTotalOrdersRecord();
      this.deletePedido();
      this.deletePendingOrders();
    } else alert('Selecciona una mesa');
  }

  private deletePedido() {
    this.pedidoServices.deletePedido(this.pedidoDelete).subscribe((data) => {});
  }

  private deletePendingOrders() {
    this.pendingOrderService
      .deletePendingOrder(this.pedidoDelete)
      .subscribe((data) => {
        this.tableNum = '';
        this.getPendingByTable();
        this.pedidosOutput.emit();
        let pendingOrder: PendingOrdersRecord[] = data;
        this.saveOrdersRecord(pendingOrder);
      });
  }

  private saveOrdersRecord(pendingOrders: PendingOrdersRecord[]) {
    pendingOrders.forEach((pendingOrder) => {
      if (pendingOrder.additional != null)
        this.pendingOrderService
          .madePendingOrderAdditionalRecord(pendingOrder)
          .subscribe((data) => {});
      if (pendingOrder.plate != null)
        this.pendingOrderService
          .madePendingOrderPlateRecord(pendingOrder)
          .subscribe((data) => {});
    });
  }

  private updateTotalOrdersRecord() {
    this.totalOrdersRecordService
      .updateTotalOrdersRecord(this.pedidoDelete.restaurantId!)
      .subscribe((data) => {
        this.totalOrdersRecordService.orderRecord = data;
      });
  }
}
