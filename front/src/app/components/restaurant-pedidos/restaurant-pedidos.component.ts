import { Restaurant } from './../../models/Restaurant';
import { PendingOrderService } from './../../services/pending-order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PedidoServicesService } from '../../services/pedido-services.service'
import { PrinterService } from 'src/app/services/printer/printer.service';

@Component({
  selector: 'app-restaurant-pedidos',
  templateUrl: './restaurant-pedidos.component.html',
  styleUrls: ['./restaurant-pedidos.component.scss']
})
export class RestaurantPedidosComponent implements OnInit {

  public selectedIndex: number = 0;

  restaurant: Restaurant = JSON.parse(sessionStorage.getItem('restaurant')!)
  pedidos!: any[]
  pendingOrders!: any[]
  printers!: any;

  constructor(private pedidoServices: PedidoServicesService, private pendingOrderService: PendingOrderService, private printerService: PrinterService) { }

  ngOnInit(): void {
    
    this.selectedIndex = parseInt(sessionStorage.getItem('tab')!)

    this.printerService.getPrinters().then((impresoras: any) => {
      this.printers = impresoras;
      this.printerService.printers = impresoras;
      this.getPedidos();
    })

    setInterval(() => {
      this.getPedidos();
      }, 300000);
  }

  getPedidos() {
    this.pedidoServices.getAllPedidos(this.restaurant.id).subscribe(data => {
      this.pedidos = data
      this.initialisePrint(data);
    })
  }

  eliminarPedidosOutput() {
    this.getPedidos();
  }


  async initialisePrint(pedidos: any[]) {
    for(let pedido of pedidos) {
      if (!pedido.printed) {
        await this.generateTicket(pedido);
        console.log(pedido);
        this.pedidoServices.setPedidoPrinted(pedido.id).subscribe(() => { });
      }
    }
  }

  async generateTicket(pedido: any) {

    if(pedido.drinkCount > 0) {
      this.printHeader(pedido);
      await this.printDrink(pedido);
    }

    if(pedido.foodCount > 0) {
      this.printHeader(pedido);
      await this.printFood(pedido);
    }
  }

  printHeader(pedido: any) {
    this.printerService.establecerEnfatizado(0);
    this.printerService.establecerJustificacion(PrinterService.Constantes.AlineacionCentro);
    this.printerService.write("MESA " + pedido.tableNum + "\n\n\n");
  }

  async printDrink(pedido: any) {
    this.printerService.establecerJustificacion(PrinterService.Constantes.AlineacionIzquierda);
    this.printerService.write("CANT  PRODUCTO\n");
    pedido.amounts.forEach((dish: any) => {
      if (dish.plate.drink){
        this.printerService.write(" " + dish.amount + "    " + dish.plate.name + "\n");
        if (dish.description) {
          this.printerService.write(dish.description + "\n");
        }
      }
    });
    let printers = this.printers.filter((e: string) => e.includes("barra"))
    for (let printer of printers) {
      await this.print(printer);
    }
  }

  async printFood(pedido: any) {
    this.printerService.establecerJustificacion(PrinterService.Constantes.AlineacionIzquierda);
    this.printerService.write("CANT  PRODUCTO\n");
    pedido.amounts.forEach((dish: any) => {
      if (!dish.plate.drink){
        this.printerService.write(" " + dish.amount + "    " + dish.plate.name + "\n");
        if (dish.description) {
          this.printerService.write("    " + dish.description + "\n");
        }
      }
    });
    let printers = this.printers.filter((e: string) => e.includes("cocina2"));
    for (let printer of printers) {
      await this.print(printer);
    }
  }

  async print(printerName: string | undefined) {
    //this.printerService.cut();
    this.printerService.partialCut();
    await this.printerService.imprimirEn(printerName)
        .then(respuestaAlImprimir => {
          if (respuestaAlImprimir === true) {
              console.log("Impreso correctamente");
              this.printerService.limpiarImpresora();
          } else {
              console.log("Error. La respuesta es: " + respuestaAlImprimir);
              this.printerService.limpiarImpresora();
          }
        });
  }
}

