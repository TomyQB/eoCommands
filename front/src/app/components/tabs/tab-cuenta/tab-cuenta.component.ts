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
import { PrinterService } from 'src/app/services/printer/printerv1.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeTableDialogComponent } from '../ChangeTable/change-table-dialog/change-table-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeletePlateComponent } from '../../restaurant-pedido-info/delete-plate/delete-plate.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JuntarMesaComponent } from './juntar-mesa/juntar-mesa.component';

@Component({
  selector: 'app-tab-cuenta',
  templateUrl: './tab-cuenta.component.html',
  styleUrls: ['./tab-cuenta.component.scss'],
})
export class TabCuentaComponent implements OnInit {
  @Input() pendingOrders: any;
  @Output() pedidosOutput = new EventEmitter<String>();
  @Output() getPedidos = new EventEmitter();

  pedidos: any;

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
    private printerService: PrinterService,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.pedidoServices.cambiarNumeroMesa.subscribe(() => {
      this.getPendingOrders();
    });
  }

  ngOnInit(): void {
    this.printers = this.printerService.printers;
    this.pedidos = this.pedidoServices.pedidos;
    this.getPendingOrders();

    setInterval(() => {
      if (this.tableNum == '') this.getPendingOrders();
      else this.filtrarPendigOrdersByNumTable(this.tableNum);
    }, 300000);
  }

  totals() {
    this.total = 0;
    this.pendingOrders?.map((plato: any) => {
      this.total =
        this.total +
        (plato.plate
          ? plato.plate.price * plato.amount
          : plato.additional.price * plato.amount);
    });

    this.total = Math.round((this.total + Number.EPSILON) * 100) / 100;

    return this.total;
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
        // this.calculateTotal();
        sessionStorage.setItem('pendingOrders', JSON.stringify(data));
      });
  }

  getPendingByTable() {
    this.pendingOrders = JSON.parse(sessionStorage.getItem('pendingOrders')!);
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
    // let i = 0;
    // while (i < this.pendingOrders.length) {
    //   if (this.pendingOrders[i].tableNum != parseInt(tableNum))
    //     this.pendingOrders.splice(i, 1);
    //   else i++;
    // }

    this.pendingOrders = this.pendingOrders.filter(
      (pedido: any) => pedido.tableNum === parseInt(tableNum)
    );
    this.pedidos = this.pedidoServices.pedidos.filter(
      (pedido: any) => pedido.tableNum === parseInt(tableNum)
    );
    this.pedidoServices.pedidosParaSeparar = this.pedidos;
    // this.pedidoServices.pedido = this.pedidos

    // this.calculateTotal();
  }

  /*prepareMessage() {
    this.whatsAppDTO.tableNum = parseInt(this.tableNum)
    this.pedidoServices.enviarCuentaWhatsapp(this.whatsAppDTO).subscribe(data => {
      this.whatsappService.singletonMessage(this.pendingOrders, this.total, data)
      this.urlWhatsapp = this.whatsappService.message
    })
  }*/

  printCuenta() {
    let isCorrectTableNum = this.pendingOrders.find(
      (order: any) => order.tableNum == this.tableNum
    );
    if (this.tableNum != '' && isCorrectTableNum) {
      this.pedidos[0].restaurantId = JSON.parse(
        sessionStorage.getItem('restaurant')!
      ).id;
      this.pedidos[0].numTable = this.tableNum;
      let text = '';
      this.printerService
        .generateBodyCuenta(this.pedidos)
        .subscribe((body: any) => {
          text = text.concat(body.text);
          text = text.concat(this.generateFooder());
          let printers = this.printers.filter((e: any) =>
            e.type.includes('cuenta')
          );
          for (let printer of printers) {
            this.printerService.print(printer.name, text).subscribe(() => {});
          }
        });
    } else alert('Selecciona una mesa existente');
  }

  print() {
    console.log();
  }

  private generateFooder() {
    let fooder = '';
    fooder = fooder.concat(
      '\n' + 'TOTAL CON IVA INCLUIDO        ' + this.total + '\n'
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

  separateCuenta() {
    this.router.navigateByUrl('/separarCuenta');
  }

  changeTableNum(tableNum: any) {
    const dialogRef = this.dialog.open(ChangeTableDialogComponent, {
      data: tableNum,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPedidos.emit();
    });
  }

  deleteOrder(pending: any) {
    let data: any = {
      restaurantId: JSON.parse(sessionStorage.getItem('restaurant')!).id,
      tableNum: pending.tableNum,
    };

    if (pending.plate) {
      data = { ...data, plateId: pending.plate.id };
      const dialogRef = this.dialog.open(DeletePlateComponent, {});

      dialogRef.afterClosed().subscribe((amountToDelete) => {
        if (amountToDelete) {
          data = { ...data, amountToDelete };
          this.deleteOrderPlate(data, pending.plate.name);
        }
      });
    } else {
      data = {
        ...data,
        additionalId: pending.additional.id,
        name: pending.additional.name,
      };
      const dialogRef = this.dialog.open(DeletePlateComponent, {});

      dialogRef.afterClosed().subscribe((amountToDelete) => {
        if (amountToDelete) {
          data = { ...data, amountToDelete };
          this.deleteOrderAdditional(data);
        }
      });
    }

    // this.pedidoServices
    //   .deleteOrder({
    //     restaurantId: JSON.parse(sessionStorage.getItem('restaurant')!).id,
    //     tableNum: pending.tableNum,
    //   })
    //   .subscribe(
    //     () => {
    //     },
    //     (error) => {
    //       this._snackBar.openFromComponent(ErrorMessageComponent, {
    //         duration: 3000,
    //       });
    //     }
    //   );
  }

  deleteOrderPlate(data: any, name: string) {
    let cancelFoodPrint = {
      tableNum: data.tableNum,
      amount: data.amountToDelete,
      name: name,
    };
    this.pedidoServices.deleteOrderPlate(data).subscribe(() => {
      this.printerService
        .generateBodyCancelFood(cancelFoodPrint)
        .subscribe((body: any) => {
          let printers = this.printers.filter((e: any) =>
            e.type.includes('cocina')
          );
          for (let printer of printers) {
            this.printerService.print(printer.name, body.text).subscribe(() => {
              this.getPendingOrders();
            });
          }
        });
    });
  }

  deleteOrderAdditional(data: any) {
    let cancelFoodPrint = {
      tableNum: data.tableNum,
      amount: data.amountToDelete,
      name: data.name,
    };
    this.pedidoServices.deleteOrderAdditional(data).subscribe(() => {
      this.printerService
        .generateBodyCancelFood(cancelFoodPrint)
        .subscribe((body: any) => {
          let printers = this.printers.filter((e: any) =>
            e.type.includes('cocina')
          );
          for (let printer of printers) {
            this.printerService.print(printer.name, body.text).subscribe(() => {
              this.getPendingOrders();
            });
          }
        });
    });
  }

  juntarMesas() {
    const dialogRef = this.dialog.open(JuntarMesaComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.getPedidos.emit();
    });
  }
}
