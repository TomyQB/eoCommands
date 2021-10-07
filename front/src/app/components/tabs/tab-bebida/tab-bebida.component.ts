import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';

@Component({
  selector: 'app-tab-bebida',
  templateUrl: './tab-bebida.component.html',
  styleUrls: ['./tab-bebida.component.scss']
})
export class TabBebidaComponent implements OnInit {
  @Input() pedidos!: any[]
  @Output() cambioBarra = new EventEmitter<number>();

  // pedidoLocal = sessionStorage.getItem('pedidos')

  constructor(private router: Router, public pedidoServices: PedidoServicesService) { }

  ngOnInit(): void {
    console.log(this.pedidos)
    this.comprobarPlatosHechos()
  }

  drinkView(pedido: any, index: number) {
    sessionStorage.setItem('pedidoInfoPlates', JSON.stringify(pedido))
    sessionStorage.setItem('index', index.toString())
    this.router.navigateByUrl("/restaurantPedidosBebida");
  }

  comprobarPlatosHechos() {
    this.pedidos.forEach(pedido => {
      if(pedido.hechosDrink == pedido.drinkCount && pedido.hechosDrink != "Servido") {
        pedido.estadoDrink = "Servido"
        this.pedidoServices.changeEstadoDrinkPedido(pedido).subscribe(data => {})

      } else if(pedido.hechosDrink != pedido.drinkCount && pedido.hechosDrink != "Pendiente") {
        console.log("HOLA!!!")
          pedido.estadoDrink = "Pendiente"
          this.pedidoServices.changeEstadoDrinkPedido(pedido).subscribe(data => {})
      }
    });
  }

}
