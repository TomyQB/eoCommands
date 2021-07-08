import { PedidoDTO } from './../../models/PedidoDTO';
import { Category } from './../../models/Category';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MenuServicesService } from '../../services/menu-services.service'
import { PedidoServicesService } from '../../services/pedido-services.service'
import { Plate } from 'src/app/models/Plate';
import { HashService } from '../../services/hash.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories!: Category[]
  // platess!: Plate[]

  pedido: PedidoDTO = {
    email: "hola@gmail.com",
    numTable: 22,
    total: 50,
    idRestaurant: 1
  }

  constructor(private pedidoService: PedidoServicesService, private menuServices: MenuServicesService, private router: Router, private activeRoute: ActivatedRoute, private hashService: HashService) { }

  ngOnInit(): void {

    this.getUrlId();

    this.menuServices.getMenu().subscribe(data => {
      this.categories = data
      // this.hashService.plates = this.categories[1].plates
      // this.hashService.plates.push(this.categories[0].plates[0])
      // this.hashService.plates.push(this.categories[0].plates[1])
      // for(let i = 1; i < this.categories.length; i++) {
      //   for (let j = 0; j < this.categories[i].plates.length; j++) {
      //     console.log(this.categories[i].plates[j])
      //     this.hashService.plates.push(this.categories[i].plates[j])
      //   }
      // }
      // this.hashService.createDictionary()
      console.log(this.categories)
    })
  }

  private getUrlId() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if(id != null) {
      localStorage.setItem('id', id);
    }
  }

  plateView(i: number) {
    this.router.navigateByUrl("/plates", {state: {plates: this.categories[i].plates}});
  }

  hacerPedido() {
    this.pedidoService.madePedido(this.pedido).subscribe(data => {})
  }

}
