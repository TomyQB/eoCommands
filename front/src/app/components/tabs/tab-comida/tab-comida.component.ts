import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';
import { RestaurantConfigurationService } from 'src/app/services/restaurant-configuration.service';
import { NO } from '../../../constants/print-confirmation';

@Component({
  selector: 'app-tab-comida',
  templateUrl: './tab-comida.component.html',
  styleUrls: ['./tab-comida.component.scss'],
})
export class TabComidaComponent implements OnInit {
  @Input() pedidos!: any[];
  @Output() cambioCocina = new EventEmitter<number>();

  pedidoLocal = sessionStorage.getItem('pedidos');
  printConfirmation: any = this.configurationService.restaurantConfig;
  constructor(
    private router: Router,
    public pedidoServices: PedidoServicesService,
    public configurationService: RestaurantConfigurationService
  ) {}

  ngOnInit(): void {
    this.configurationService.restaurantConfigObservable.subscribe((res) => {
      this.printConfirmation = res;
      this.comprobarPlatosHechos();
    });
  }

  plateView(pedido: any, index: number) {
    sessionStorage.setItem('pedidoInfoPlates', JSON.stringify(pedido));
    sessionStorage.setItem('index', index.toString());
    this.router.navigateByUrl('/restaurantPedidosInfo');
  }

  private comprobarPlatosHechos() {
    this.pedidos.forEach((pedido) => {
      if (this.printConfirmation?.printConfirmation === NO || pedido.printed) {
        if (
          pedido.hechosFood == pedido.foodCount &&
          pedido.estadoFood != 'Servido'
        ) {
          pedido.estadoFood = 'Servido';
          this.pedidoServices
            .changeEstadoFoodPedido(pedido)
            .subscribe((data) => {});
        } else if (
          pedido.hechosFood != pedido.foodCount &&
          pedido.estadoFood == 'Servido'
        ) {
          pedido.estadoFood = 'Pendiente';
          this.pedidoServices
            .changeEstadoFoodPedido(pedido)
            .subscribe((data) => {});
        }
      } else {
        pedido.estadoFood = 'Pendiente de confirmación';
      }
    });
  }
}
