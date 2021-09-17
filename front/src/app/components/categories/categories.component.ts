import { RestaurantService } from './../../services/restaurant.service';
import { Pedido } from '../../models/Pedido';
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
  image!: string

  restaurantName: string = this.activeRoute.snapshot.paramMap.get('name')!

  constructor(private pedidoService: PedidoServicesService, private menuServices: MenuServicesService, private restaurantService: RestaurantService, private router: Router, private activeRoute: ActivatedRoute, private hashService: HashService) { }

  ngOnInit(): void {
    this.setUrlName();

    this.menuServices.getMenu(this.restaurantName).subscribe(data => {
      this.categories = data
      this.image = data[0].restaurant.image  //ARREGLAR PARA QUE NO SE VEA FEO
      localStorage.setItem('idRestaurant', data[0].restaurant.id);
    })
  }

  private setUrlName() {
    if(this.restaurantName != null) {
      localStorage.setItem('name', this.restaurantName);
    }
  }

  plateView(i: number, category: Category) {

    this.categories[i].plates = this.duplicateFilter(this.categories[i].plates)

    localStorage.setItem('cat', JSON.stringify(category))
    localStorage.setItem('plat', JSON.stringify(this.categories[i].plates))

    this.router.navigateByUrl("/restaurant/plates", {state: {plates: this.categories[i].plates, category: category}});
  }

  duplicateFilter(plates: Plate[]): Plate[] {
    let hash: {[key: string]: boolean} = {}
    plates = plates.filter(o => hash[o.name] ? false : hash[o.name] = true);

    return plates
  }

}