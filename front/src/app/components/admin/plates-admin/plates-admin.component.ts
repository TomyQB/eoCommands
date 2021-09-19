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

  plates!: Plate[]
  category: Category = JSON.parse(localStorage.getItem('category')!)

  plateDTO: PlateDTO = {
    category: 0,
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
    localStorage.setItem('categoryIdAdmin', this.category.id.toString())
    this.router.navigateByUrl("/adminPlatesCreate", {state: {category: this.category.id}});
  }


  deletePlate(plate: Plate) {
    console.log(plate)
    const dialogRef = this.dialog.open(ModalDeleteComponent, this.dialogConfig)
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.plateService.deletePlate(plate.id).subscribe(data => {
          window.location.reload();
        })
      }
    })
  }

  editPlate(plate: Plate) {
    localStorage.setItem('plateIdAdmin', plate.id.toString())
    localStorage.setItem('categoryIdAdmin', this.category.id.toString())
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

}
