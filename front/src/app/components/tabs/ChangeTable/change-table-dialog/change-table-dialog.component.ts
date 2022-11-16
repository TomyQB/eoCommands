import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PedidoServicesService } from '../../../../services/pedido-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../../../../share/snackBar/error-message/error-message.component';

@Component({
  selector: 'app-change-table-dialog',
  templateUrl: './change-table-dialog.component.html',
  styleUrls: ['./change-table-dialog.component.scss'],
})
export class ChangeTableDialogComponent implements OnInit {
  newTableNum = null;

  constructor(
    public dialogRef: MatDialogRef<ChangeTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public oldTableNum: any,
    private pedidoServices: PedidoServicesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  changeTable() {
    this.pedidoServices
      .changeTable({
        restaurantId: JSON.parse(sessionStorage.getItem('restaurant')!).id,
        oldTableNum: this.oldTableNum,
        newTableNum: this.newTableNum,
      })
      .subscribe(
        () => {
          this.dialogRef.close();
        },
        (error) => {
          this._snackBar.openFromComponent(ErrorMessageComponent, {
            duration: 3000,
          });
        }
      );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
