import { Router } from '@angular/router';
import { PlateService } from './../../../services/plate.service';
import { PlateDTO } from './../../../models/PlateDTO';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-plates-create',
  templateUrl: './plates-create.component.html',
  styleUrls: ['./plates-create.component.scss']
})
export class PlatesCreateComponent implements OnInit {

  plate: PlateDTO = {
    category: history.state.category,
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

  constructor(private plateService: PlateService, private router: Router) { }

  ngOnInit(): void {
    if(history.state.plate) {
      this.nameFormControl.setValue(history.state.plate.name)
      this.plate.id = history.state.plate.id
      this.plate.description = history.state.plate.description
      this.plate.drink = history.state.plate.drink
      this.plate.name = history.state.plate.name
      this.priceFormControl.setValue(history.state.plate.price)
    }
    console.log(this.plate)
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
        this.updatePlateList(this.plate.id!)
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

}
