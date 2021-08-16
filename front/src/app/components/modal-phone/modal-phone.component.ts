import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-phone',
  templateUrl: './modal-phone.component.html',
  styleUrls: ['./modal-phone.component.scss']
})
export class ModalPhoneComponent implements OnInit {

  @Input() code!: number;

  codeFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(public dialog: MatDialogRef<ModalPhoneComponent>) { }

  ngOnInit(): void {
  }

  acept() {
    if(this.codeFormControl.value == this.code) {
      this.dialog.close(true)
    } else {
      alert("Codigo incorrecto")
    }
  }

  cancel() {
    this.dialog.close(false)
  }

}
