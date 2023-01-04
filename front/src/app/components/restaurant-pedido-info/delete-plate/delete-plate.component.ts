import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-plate',
  templateUrl: './delete-plate.component.html',
  styleUrls: ['./delete-plate.component.scss'],
})
export class DeletePlateComponent implements OnInit {
  amountToDelete = null;

  constructor(public dialogRef: MatDialogRef<DeletePlateComponent>) {}

  ngOnInit(): void {}

  delete() {
    this.dialogRef.close(this.amountToDelete);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
