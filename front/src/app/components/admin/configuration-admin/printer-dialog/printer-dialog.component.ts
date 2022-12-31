import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { PRINT_TYPE } from '../../../../constants/print-confirmation';
import { PrinterService } from '../../../../services/printer/printerv1.service';

@Component({
  selector: 'app-printer-dialog',
  templateUrl: './printer-dialog.component.html',
  styleUrls: ['./printer-dialog.component.scss'],
})
export class PrinterDialogComponent implements OnInit {
  printer = {};
  printType = PRINT_TYPE;
  printerList = <any>['hola', 'adios', 'ciao ciao'];
  typeFormControl = new FormControl('', [Validators.required]);
  printerFormControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<PrinterDialogComponent>,
    public printerService: PrinterService
  ) {
    //this.printerList = printerService.getPrinters();
  }

  ngOnInit(): void {}

  payload() {
    return {
      type: this.typeFormControl.value,
      name: this.printerFormControl.value,
    };
  }

  sendPrint() {
    if (this.typeFormControl.value && this.printerFormControl.value) {
      this.dialogRef.close(this.payload());
    } else alert('Rellena todos los campos correctamente');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
