import { Component, OnInit } from '@angular/core';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-pedido-info',
  templateUrl: './pedido-info.component.html',
  styleUrls: ['./pedido-info.component.scss']
})
export class PedidoInfoComponent implements OnInit {

  pedido!: any[]

  constructor(private pedidoService: PedidoServicesService) { }

  ngOnInit(): void {
    this.pedidoService.getPedidoInfo().subscribe(data => {
      this.pedido = data.amounts


      console.log(this.pedido)
    })
  }

}
