import { PlateDTO } from './../../../models/PlateDTO';
import { PlateService } from './../../../services/plate.service';
import { MenuServicesService } from 'src/app/services/menu-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { Plate } from 'src/app/models/Plate';
import { CategoryDTO } from 'src/app/models/CategoryDTO';

@Component({
  selector: 'app-plates-admin',
  templateUrl: './plates-admin.component.html',
  styleUrls: ['./plates-admin.component.scss']
})
export class PlatesAdminComponent implements OnInit {

  plates: Plate[] = history.state.plates
  category: Category = history.state.category

  // Para hacer tests
  cat: CategoryDTO = {
    name: "",
    restaurant: 0,
    image: ""
  }

  plat: PlateDTO = {
    category: 1,
    description: "",
    drink: true,
    name: "",
    price: 0
  }

  constructor(private router: Router, private menuService: MenuServicesService, private plateService: PlateService) { }

  ngOnInit(): void {
  }

  plateInfoView(i: number) {
    this.router.navigateByUrl("/adminPlatesCreate", {state: {plate: this.plates[i]}});
  }

  createPlate() {
    this.router.navigateByUrl("/adminPlatesCreate");
  }

  addCategoryAndPlates() {
    console.log("hola")

    // AÑADIR CATEGORÍA
    // this.menuService.addCategory(this.cat).subscribe(data => {

    // })

    // ELIMINAR CATEGORÍA
    // this.menuService.deleteCategory(1).subscribe(data => {

    // })



    // AÑADIR PLATO
    // this.plateService.addPlate(this.plat).subscribe(data => {

    // })

    // ELIMINAR PLATO
    // this.plateService.deletePlate(119).subscribe(data => {

    // })
  }

}
