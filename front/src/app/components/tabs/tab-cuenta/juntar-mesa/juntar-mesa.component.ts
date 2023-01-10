import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PedidoServicesService } from '../../../../services/pedido-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../../../../share/snackBar/error-message/error-message.component';

@Component({
  selector: 'app-juntar-mesa',
  templateUrl: './juntar-mesa.component.html',
  styleUrls: ['./juntar-mesa.component.scss'],
})
export class JuntarMesaComponent implements OnInit {
  tableNumA = null;
  tableNumB = null;

  constructor(
    public dialogRef: MatDialogRef<JuntarMesaComponent>,
    private pedidoServices: PedidoServicesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  juntarMesas() {
    this.pedidoServices
      .tableAssembly({
        restaurantId: JSON.parse(sessionStorage.getItem('restaurant')!).id,
        firstTable: this.tableNumA,
        secondTable: this.tableNumB,
        finalTable: this.tableNumA,
      })
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
