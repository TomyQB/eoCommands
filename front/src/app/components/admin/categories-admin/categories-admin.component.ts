import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { Plate } from 'src/app/models/Plate';
import { HashService } from 'src/app/services/hash.service';
import { MenuServicesService } from 'src/app/services/menu-services.service';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.scss']
})
export class CategoriesAdminComponent implements OnInit {

  categories!: Category[]
  image!: string

  restaurantName: string = localStorage.getItem("rname")!

  constructor(private pedidoService: PedidoServicesService, private menuServices: MenuServicesService, private restaurantService: RestaurantService, private router: Router, private activeRoute: ActivatedRoute, private hashService: HashService) { }

  ngOnInit(): void {
    this.setUrlName();

    this.menuServices.getMenu(this.restaurantName).subscribe(data => {
      this.categories = data
      this.image = data[0].restaurant.image
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

    this.router.navigateByUrl("/adminPlates", {state: {plates: this.categories[i].plates, category: category}});
  }

  duplicateFilter(plates: Plate[]): Plate[] {
    let hash: {[key: string]: boolean} = {}
    plates = plates.filter(o => hash[o.name] ? false : hash[o.name] = true);

    return plates
  }

  createCategory() {
    this.router.navigateByUrl("/adminCategoriesCreate");
  }

}
