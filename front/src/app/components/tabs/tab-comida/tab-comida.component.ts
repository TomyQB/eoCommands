import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangeTableDialogComponent } from '../ChangeTable/change-table-dialog/change-table-dialog.component';

@Component({
  selector: 'app-tab-comida',
  templateUrl: './tab-comida.component.html',
  styleUrls: ['./tab-comida.component.scss'],
})
export class TabComidaComponent implements OnInit {
  @Input() pedidos!: any[];
  @Output() cambioCocina = new EventEmitter<number>();
  @Output() getPedidos = new EventEmitter();

  pedidoLocal = sessionStorage.getItem('pedidos');

  constructor(
    private router: Router,
    public pedidoServices: PedidoServicesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.comprobarPlatosHechos();
  }

  openDialog(tableNum: any) {
    const dialogRef = this.dialog.open(ChangeTableDialogComponent, {
      data: tableNum,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getPedidos.emit();
    });
  }

  plateView(pedido: any, index: number) {
    sessionStorage.setItem('pedidoInfoPlates', JSON.stringify(pedido));
    sessionStorage.setItem('index', index.toString());
    this.router.navigateByUrl('/restaurantPedidosInfo');
  }

  private comprobarPlatosHechos() {
    this.pedidos.forEach((pedido) => {
      if (
        pedido.hechosFood == pedido.foodCount &&
        pedido.estadoFood != 'Servido'
      ) {
        pedido.estadoFood = 'Servido';
        this.pedidoServices
          .changeEstadoFoodPedido(pedido)
          .subscribe((data) => {});
      } else if (
        pedido.hechosFood != pedido.foodCount &&
        pedido.estadoFood == 'Servido'
      ) {
        pedido.estadoFood = 'Pendiente';
        this.pedidoServices
          .changeEstadoFoodPedido(pedido)
          .subscribe((data) => {});
      }
    });
  }
}
