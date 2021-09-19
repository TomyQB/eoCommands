import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdditionalService } from 'src/app/services/additional.service';
import { AdditionalDTO } from 'src/app/models/AdditionalDTO';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-extras-create',
  templateUrl: './extras-create.component.html',
  styleUrls: ['./extras-create.component.scss']
})
export class ExtrasCreateComponent implements OnInit {

  @Input() idPlate!: number;
  @Input() name!: string;
  @Input() price!: number;
  @Input() id!: number;

  additional: AdditionalDTO = {
    name: "",
    price: 0,
    plateId: 0
  }

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  priceFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private additionalService: AdditionalService, private router: Router, public dialog: MatDialogRef<ExtrasCreateComponent>) { }

  ngOnInit(): void {
    // console.log(this.additional)
    console.log(this.idPlate)
    if(this.name != undefined) {
      this.nameFormControl.setValue(this.name)
      this.priceFormControl.setValue(this.price)
      this.additional.id = this.id
    }
  }

  createAdditional() {
    if(this.nameFormControl.value != "" && this.priceFormControl.value != "") {
      this.additional.name = this.nameFormControl.value
      this.additional.price = this.priceFormControl.value
      this.additional.plateId = this.idPlate
      this.dialog.close(this.additional)

    } else {
      alert("Nombre y precio obligatorios")
    }
  }

}
