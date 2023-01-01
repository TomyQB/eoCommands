import { Amount } from './../../models/Amount';
import { AmountServicesService } from './../../services/amount-services.service';
import { Component, OnInit } from '@angular/core';

import { PedidoServicesService } from '../../services/pedido-services.service';
import { RestaurantConfigurationService } from 'src/app/services/restaurant-configuration.service';
import { NO, YES } from '../../constants/print-confirmation';
import { PrinterService } from '../../services/printer/printerv1.service';
import { RestaurantPrinterService } from '../../services/restaurant-printer.service';
import { Restaurant } from '../../models/Restaurant';

@Component({
  selector: 'app-restaurant-pedido-info',
  templateUrl: './restaurant-pedido-info.component.html',
  styleUrls: ['./restaurant-pedido-info.component.scss'],
})
export class RestaurantPedidoInfoComponent implements OnInit {
  pedido: any = JSON.parse(sessionStorage.getItem('pedidoInfoPlates')!);
  index: number = parseInt(sessionStorage.getItem('index')!);
  printConfirmation: any = this.configurationService.restaurantConfig;
  restaurant: Restaurant = JSON.parse(sessionStorage.getItem('restaurant')!);
  printers!: any;

  amount: Amount = {
    amount: 0,
    description: '',
    subTotal: 0,
    extras: [],
    estado: '',
  };

  constructor(
    public pedidoServices: PedidoServicesService,
    private amountService: AmountServicesService,
    public configurationService: RestaurantConfigurationService,
    private printerService: PrinterService,
    private restaurantPrinterService: RestaurantPrinterService
  ) {}

  ngOnInit(): void {
    if (!this.printerService.printers) {
      this.restaurantPrinterService
        .getPrinters(this.restaurant.id)
        .subscribe((impresoras) => {
          this.printers = impresoras;
          this.printerService.printers = impresoras;
        });
    } else {
      this.printers = this.printerService.printers;
    }
    sessionStorage.setItem('tab', '0');
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('pedidoInfoPlates');
    sessionStorage.removeItem('index');
  }

  marcarHecho(i: number, estado: string) {
    if (estado === 'Pendiente') {
      this.changesEstadoLocal(i, 'Cocinando');
      this.changeEstadoBBDD(i, 'Cocinando');
    } else if (estado === 'Cocinando') {
      this.changesEstadoLocal(i, 'Terminado');
      this.changeEstadoBBDD(i, 'Terminado');
    } else if (estado === 'Terminado') {
      this.changesEstadoLocal(i, 'Servido');
      this.changeEstadoBBDD(i, 'Servido');
      this.addFoodCount();
    } else if (estado === 'Servido') {
      this.changesEstadoLocal(i, 'Pendiente');
      this.changeEstadoBBDD(i, 'Pendiente');
      this.takeOutFoodCount();
    }
  }

  imprimir() {
    this.generateTicket(this.pedido);
  }

  generateTicket(pedido: any) {
    if (pedido.drinkCount > 0) {
      this.printerService.generateBodyDrink(pedido).subscribe((body: any) => {
        let printers = this.printers.filter((e: any) =>
          e.type.includes('barra')
        );
        for (let printer of printers) {
          this.printerService.print(printer.name, body.text).subscribe(() => {
            this.pedidoServices.setPedidoPrinted(pedido.id).subscribe(() => {});
          });
        }
      });
    }

    if (pedido.foodCount > 0) {
      this.printerService.generateBodyFood(pedido).subscribe((body: any) => {
        let printers = this.printers.filter((e: any) =>
          e.type.includes('cocina')
        );
        for (let printer of printers) {
          this.printerService.print(printer.name, body.text).subscribe(() => {
            this.pedidoServices.setPedidoPrinted(pedido.id).subscribe(() => {});
          });
        }
      });
    }
  }

  private changeEstadoBBDD(i: number, estado: string) {
    this.amount.estado = estado;
    this.amount.id = this.pedido.amounts[i].id;
    this.amountService.changeEstadoAmount(this.amount).subscribe((data) => {});
  }

  private changesEstadoLocal(i: number, estado: string) {
    this.pedido.amounts[i].estado = estado;
    sessionStorage.setItem('pedidoInfoPlates', JSON.stringify(this.pedido));
  }

  private addFoodCount() {
    this.pedido.hechosFood++;
    this.pedidoServices.changeFoodCount(this.pedido).subscribe((data) => {});
  }

  private takeOutFoodCount() {
    this.pedido.hechosFood--;
    this.pedidoServices.changeFoodCount(this.pedido).subscribe((data) => {});
  }
}
