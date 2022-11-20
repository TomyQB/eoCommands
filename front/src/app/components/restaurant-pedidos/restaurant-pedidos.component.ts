import { Restaurant } from './../../models/Restaurant';
import { PendingOrderService } from './../../services/pending-order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PedidoServicesService } from '../../services/pedido-services.service';
import { PrinterService } from 'src/app/services/printer/printerv1.service';
import { Subject } from 'rxjs';
import { RestaurantPrinterService } from 'src/app/services/restaurant-printer.service';

@Component({
  selector: 'app-restaurant-pedidos',
  templateUrl: './restaurant-pedidos.component.html',
  styleUrls: ['./restaurant-pedidos.component.scss'],
})
export class RestaurantPedidosComponent implements OnInit {
  public selectedIndex: number = 0;

  restaurant: Restaurant = JSON.parse(sessionStorage.getItem('restaurant')!);
  pedidos!: any[];
  pendingOrders!: any[];
  printers!: any;

  constructor(
    private pedidoServices: PedidoServicesService,
    private pendingOrderService: PendingOrderService,
    private restaurantPrinterService: RestaurantPrinterService,
    private printerService: PrinterService
  ) {}

  ngOnInit(): void {
    this.selectedIndex = parseInt(sessionStorage.getItem('tab')!);

    if(!this.printerService.printers) {
      this.restaurantPrinterService.getPrinters(this.restaurant.id).subscribe(impresoras => {
        this.printers = impresoras;
        this.printerService.printers = impresoras;
        this.getPedidos();
      })
    } else {
      this.printers = this.printerService.printers;
      this.getPedidos();
    }

    setInterval(() => {
      this.getPedidos();
    }, 300000);
  }

  getPedidos() {
    this.pedidoServices.cambiarNumeroMesa.next();
    this.pedidoServices.getAllPedidos(this.restaurant.id).subscribe((data) => {
      this.pedidos = data;
      if (this.printers) this.initialisePrint(data);
    });
  }

  eliminarPedidosOutput() {
    this.getPedidos();
  }

  async initialisePrint(pedidos: any[]) {
    for (let pedido of pedidos) {
      if (!pedido.printed) {
        await this.generateTicket(pedido);
        this.pedidoServices.setPedidoPrinted(pedido.id).subscribe(() => {});
      }
    }
  }

  async generateTicket(pedido: any) {
    if (pedido.drinkCount > 0) {
      this.printerService.generateBodyDrink(pedido).subscribe((body: any) => {
        console.log(body.text)
        let printers = this.printers.filter((e: any) =>
          e.type.includes('cuenta')
        );
        for (let printer of printers) {
          console.log(printer)
          this.printerService.print(printer.name, body.text).subscribe(() => {})
        }
      })
    }

    if (pedido.foodCount > 0) {
      this.printerService.generateBodyFood(pedido).subscribe((body: any) => {
        console.log(body.text)
        let printers = this.printers.filter((e: any) =>
          e.type.includes('cuenta')
        );
        for (let printer of printers) {
          console.log(printer)
          this.printerService.print(printer.name, body.text).subscribe(() => {})
        }
      })
    }
  }

}
