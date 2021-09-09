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

  cat: CategoryDTO = {
    name: "",
    type: "",
    restaurant: 0
  }

  constructor(private router: Router, private menuService: MenuServicesService) { }

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
    // this.menuService.addCategory(this.cat).subscribe(data => {

    // })

    this.menuService.deleteCategory(1).subscribe(data => {

    })
  }

}
