import { HashService } from './../../services/hash.service';
import { PedidoDTO } from './../../models/PedidoDTO';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PedidoServicesService } from '../../services/pedido-services.service'

@Component({
  selector: 'app-pedido-info',
  templateUrl: './pedido-info.component.html',
  styleUrls: ['./pedido-info.component.scss']
})
export class PedidoInfoComponent implements OnInit {

  pedido!: any[]

  pedidoInfo: PedidoDTO = {
    numTable: -1,
    email: "",
    restaurantName: localStorage.getItem("name")!,
    total: -1
  }

  constructor(private pedidoService: PedidoServicesService, private router: Router, private hash: HashService) { }

  ngOnInit(): void {
    this.pedidoService.getPedidoInfo().subscribe(data => {
      this.pedido = data.amounts


      console.log(this.pedido)
    })
  }

  getEmail(event: any) {
    this.pedidoInfo.email = event.target.value
  }

  getTableNum(event: any) {
    this.pedidoInfo.numTable = event.target.value
  }

  finishPedido() {
    this.pedidoService.madePedido(this.pedidoInfo).subscribe(data => {
      if(data) {
        // this.hash.dic = {}
        const name = localStorage.getItem("name")
        this.router.navigateByUrl("/menu/" + name);
      }
    })
  }

}
