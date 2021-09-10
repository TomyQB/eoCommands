import { ModalDeleteComponent } from './../../modal-delete/modal-delete.component';
import { MenuServicesService } from './../../../services/menu-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { Plate } from 'src/app/models/Plate';
import { HashService } from 'src/app/services/hash.service';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.scss']
})
export class CategoriesAdminComponent implements OnInit {

  categories!: Category[]
  image!: string

  restaurantName: string = localStorage.getItem("rname")!

  dialogConfig: MatDialogConfig = {
    width: '90%',
  }

  constructor(public dialog: MatDialog, private pedidoService: PedidoServicesService, private menuService: MenuServicesService, private restaurantService: RestaurantService, private router: Router, private activeRoute: ActivatedRoute, private hashService: HashService) { }

  ngOnInit(): void {
    this.setUrlName();

    this.menuService.getMenu(this.restaurantName).subscribe(data => {
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
    localStorage.setItem('plates', JSON.stringify(this.categories[i].plates))
    localStorage.setItem('category', JSON.stringify(category))
    this.router.navigateByUrl("/adminPlates"/*, {state: {plates: this.categories[i].plates, category: category}}*/);
  }

  duplicateFilter(plates: Plate[]): Plate[] {
    let hash: {[key: string]: boolean} = {}
    plates = plates.filter(o => hash[o.name] ? false : hash[o.name] = true);

    return plates
  }

  createCategory() {
    this.router.navigateByUrl("/adminCategoriesCreate");
  }

  deleteCategory(category: Category) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, this.dialogConfig)
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.menuService.deleteCategory(category.id).subscribe(data => {
          window.location.reload();
        })
      }
    })
  }

  editCategory(category: Category) {
    // console.log(category)
    this.router.navigateByUrl("/adminCategoriesCreate", {state: {category: category}});
  }

}
