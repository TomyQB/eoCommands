import { PlateDTO } from './../../../models/PlateDTO';
import { PlateService } from './../../../services/plate.service';
import { MenuServicesService } from 'src/app/services/menu-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { Plate } from 'src/app/models/Plate';
import { CategoryDTO } from 'src/app/models/CategoryDTO';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDeleteComponent } from '../../modal-delete/modal-delete.component';

@Component({
  selector: 'app-plates-admin',
  templateUrl: './plates-admin.component.html',
  styleUrls: ['./plates-admin.component.scss']
})
export class PlatesAdminComponent implements OnInit {

  plates!: Plate[] /*= JSON.parse(localStorage.getItem('plates')!)*/
  category: Category = JSON.parse(localStorage.getItem('category')!)

  // Para hacer tests
  cat: CategoryDTO = {
    name: "",
    restaurant: 0,
    image: ""
  }

  plateDTO: PlateDTO = {
    category: 1,
    description: "",
    drink: true,
    name: "",
    price: 0,
    id: 1,
    available: false
  }

  dialogConfig: MatDialogConfig = {
    width: '90%',
  }

  constructor(public dialog: MatDialog, private router: Router, private menuService: MenuServicesService, private plateService: PlateService) { }

  ngOnInit(): void {
    this.plateService.getPlatesByCategoryId(this.category.id).subscribe(data => {
      this.plates = data
    })
    console.log(this.plates)
  }

  createPlate() {
    this.router.navigateByUrl("/adminPlatesCreate", {state: {category: this.category.id}});
  }


  deletePlate(plate: Plate, index: number) {
    console.log(plate)
    const dialogRef = this.dialog.open(ModalDeleteComponent, this.dialogConfig)
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.plates.splice(index, 1);
        localStorage.setItem('plates', JSON.stringify(this.plates))
        this.plateService.deletePlate(plate.id).subscribe(data => {
          window.location.reload();
        })
      }
    })
  }

  editPlate(plate: Plate) {
    this.router.navigateByUrl("/adminPlatesCreate", {state: {plate: plate, category: this.category.id}});
  }

  updateDisponibility(id: number, isDisponible: boolean, index: number) {
    this.plateDTO.id = id
    this.plateDTO.available = isDisponible
    this.plateService.updatePlate(this.plateDTO).subscribe(data => {
      this.plates[index].available = isDisponible
      localStorage.setItem('plates', JSON.stringify(this.plates))
    })
  }

  goCategoriesAdmin() {
    this.router.navigateByUrl("/adminCategories");
  }

  addCategoryAndPlates() {
    console.log("hola")

    // AÑADIR CATEGORÍA
    // this.menuService.addCategory(this.cat).subscribe(data => {

    // })

    // ELIMINAR CATEGORÍA
    // this.menuService.deleteCategory(16).subscribe(data => {

    // })



    // AÑADIR PLATO
    // this.plateService.addPlate(this.plat).subscribe(data => {

    // })

    // ELIMINAR PLATO
    // this.plateService.deletePlate(119).subscribe(data => {

    // })

    // CAMBIAR DISPONIBILIDAD DEL PLATO
    // this.plateService.updatePlate(this.plat).subscribe(data => {

    // })
  }

}
