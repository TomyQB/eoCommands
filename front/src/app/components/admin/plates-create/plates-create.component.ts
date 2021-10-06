import { AdditionalService } from './../../../services/additional.service';
import { Router } from '@angular/router';
import { PlateService } from './../../../services/plate.service';
import { PlateDTO } from './../../../models/PlateDTO';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ExtrasCreateComponent } from '../extras-create/extras-create.component';
import { ModalDeleteComponent } from '../../modal-delete/modal-delete.component';
import { AdditionalDTO } from 'src/app/models/AdditionalDTO';

@Component({
  selector: 'app-plates-create',
  templateUrl: './plates-create.component.html',
  styleUrls: ['./plates-create.component.scss']
})
export class PlatesCreateComponent implements OnInit {

  alergenos: string[] = ['Cereales que contengan gluten', 'Crustáceos y productos a base de crustáceos', 'Huevos y productos a base de huevo',
                          'Pescado y productos a base de pescado', 'Cacahuetes y productos a base de cacahuetes', 'Soja y productos a base de soja',
                          'Leche y sus derivados (incluida la lactosa)', 'Frutos de cáscara y productos derivados', 'Apio y productos derivados',
                          'Mostaza y productos derivados', 'Granos de sésamo y productos a base de granos de sésamo', 'Dióxido de azufre y sulfitos',
                          'Altramuces y productos a base de altramuces', 'Moluscos y productos a base de moluscos']

  alergenosOnDescription: string[] = [""]

  additional!: AdditionalDTO[]

  isDisable: string = "true"

  plate: PlateDTO = {
    category: parseInt(sessionStorage.getItem('categoryIdAdmin')!),
    description: "",
    drink: false,
    name: "",
    price: 0,
    id: 0,
    available: true
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  priceFormControl = new FormControl('', [
    Validators.required,
  ]);

  dialogConfig: MatDialogConfig = {
    width: '50%',
  }

  constructor(private plateService: PlateService, private router: Router, private additionalService: AdditionalService, public dialog: MatDialog,) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('plateIdAdmin')!) {
      console.log("dentro")
      this.plateService.getPlateById(parseInt(sessionStorage.getItem('plateIdAdmin')!)).subscribe(data => {
        console.log("dentro1")
        this.isDisable = "false"
        this.additional = data.additionals
        this.nameFormControl.setValue(data.name)
        this.plate.id = data.id
        this.plate.description = data.description
        this.plate.drink = data.drink
        this.plate.name = data.name
        this.priceFormControl.setValue(data.price)
      })
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    sessionStorage.removeItem('plateIdAdmin')
  }

  createPlate(description: string) {
    if(this.priceFormControl.value != "" && this.nameFormControl.value != "") {
      this.plate.name = this.nameFormControl.value
      this.plate.price = this.priceFormControl.value

      // this.alergenosOnDescription.forEach(alergeno => {
      //   description += "\n" + alergeno
      // });

      if(this.alergenosOnDescription.length > 1) description += "\n\n- ALERGENOS:"

      for(let i = 1; i < this.alergenosOnDescription.length; i++) {
        description += "\n- " + this.alergenosOnDescription[i]
      }

      this.plate.description = description

      // console.log(this.plate.name)
      // console.log(this.plate.price)
      console.log(this.plate.description)
      // console.log(this.plate.drink)
      // console.log(this.plate.category)
      this.plateService.addPlate(this.plate).subscribe(data => {
        this.router.navigateByUrl("/adminPlates");
      })
    }
  }

  updatePlateList(id: number) {
    var localPlates = JSON.parse(sessionStorage.getItem('plates')!)
    if(localPlates.findIndex((plate: { id: number; }) => plate.id === id) >= 0) {
      console.log("si")
      for(let i = 0; i < localPlates.length; i++) {
        if(localPlates[i].id == id){
          localPlates[i].name = this.plate.name
          localPlates[i].price = this.plate.price
          localPlates[i].available = this.plate.available
          localPlates[i].description = this.plate.description
          localPlates[i].drink = this.plate.drink
        }
      }
    } else {
      localPlates.push(this.plate)
    }
    sessionStorage.setItem('plates', JSON.stringify(localPlates))
  }

  createAdditional() {
    const dialogRef = this.dialog.open(ExtrasCreateComponent, this.dialogConfig)
    dialogRef.componentInstance.idPlate = this.plate.id!
    dialogRef.afterClosed().subscribe(res => {
      console.log(this.plate.id)
      if(res){
        console.log(res)
        this.additionalService.addAdditional(res).subscribe(data => {
          this.ngOnInit()
        })
      }
    })
  }

  deleteAdditional(id: number) {
    const dialogRef = this.dialog.open(ModalDeleteComponent, this.dialogConfig)
    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.additionalService.deleteAdditional(id).subscribe(data => {
          this.ngOnInit()
        })
      }
    })
  }

  editAdditional(additional: AdditionalDTO) {
    const dialogRef = this.dialog.open(ExtrasCreateComponent, this.dialogConfig)
    dialogRef.componentInstance.idPlate = this.plate.id!
    dialogRef.componentInstance.name = additional.name
    dialogRef.componentInstance.price = additional.price
    dialogRef.componentInstance.id = additional.id!
    dialogRef.afterClosed().subscribe(res => {
      this.additionalService.addAdditional(res).subscribe(data => {
        this.ngOnInit()
      })
    })
  }

  addAlergeno(i: number) {
    if(this.alergenosOnDescription.includes(this.alergenos[i])){
      let index = this.alergenosOnDescription.indexOf(this.alergenos[i])
      this.alergenosOnDescription.splice(index, 1)
    } else {
      this.alergenosOnDescription.push(this.alergenos[i])
    }
  }

}
