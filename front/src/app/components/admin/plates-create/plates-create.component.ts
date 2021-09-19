import { AdditionalService } from './../../../services/additional.service';
import { Additional } from './../../../models/Additional';
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

  additional!: AdditionalDTO[]

  isDisable: string = "true"

  plate: PlateDTO = {
    category: parseInt(localStorage.getItem('categoryIdAdmin')!),
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
    console.log(localStorage.getItem('categoryIdAdmin')!)
    if(localStorage.getItem('plateIdAdmin')!) {
      console.log("dentro")
      this.plateService.getPlateById(parseInt(localStorage.getItem('plateIdAdmin')!)).subscribe(data => {
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
    // console.log(history.state.plate)
    // if(JSON.parse(localStorage.getItem('plateAdmin')!)) {
    //   this.isDisable = "false"
    //   this.additional = JSON.parse(localStorage.getItem('plateAdmin')!).additionals
    //   this.nameFormControl.setValue(JSON.parse(localStorage.getItem('plateAdmin')!).name)
    //   this.plate.id = JSON.parse(localStorage.getItem('plateAdmin')!).id
    //   this.plate.description = JSON.parse(localStorage.getItem('plateAdmin')!).description
    //   this.plate.drink = JSON.parse(localStorage.getItem('plateAdmin')!).drink
    //   this.plate.name = JSON.parse(localStorage.getItem('plateAdmin')!).name
    //   this.priceFormControl.setValue(JSON.parse(localStorage.getItem('plateAdmin')!).price)
    // }
    // console.log(this.plate)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    localStorage.removeItem('plateIdAdmin')
  }

  createPlate(description: string) {
    if(this.priceFormControl.value != "" && this.nameFormControl.value != "") {
      this.plate.name = this.nameFormControl.value
      this.plate.price = this.priceFormControl.value
      this.plate.description = description

      console.log(this.plate.name)
      console.log(this.plate.price)
      console.log(this.plate.description)
      console.log(this.plate.drink)
      console.log(this.plate.category)
      this.plateService.addPlate(this.plate).subscribe(data => {
        // this.updatePlateList(this.plate.id!)
        this.router.navigateByUrl("/adminPlates");
      })
    }
  }

  updatePlateList(id: number) {
    var localPlates = JSON.parse(localStorage.getItem('plates')!)
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
    localStorage.setItem('plates', JSON.stringify(localPlates))
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

}
