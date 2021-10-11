import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalDeleteComponent>) {
    dialog.disableClose = true;
  }

  ngOnInit(): void {
  }


  acept() {
    this.dialog.close(true)
  }

  cancel() {
    this.dialog.close(false)
  }

}
