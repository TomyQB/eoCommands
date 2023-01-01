import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PedidoServicesService } from 'src/app/services/pedido-services.service';
@Component({
  selector: 'app-separar-mesa',
  templateUrl: './separar-mesa.component.html',
  styleUrls: ['./separar-mesa.component.scss']
})
export class SepararMesaComponent implements OnInit {

  cuentaDividida = <any>[]
  cuentaCompleta = <any>[]
  
  constructor(private pedidoServices: PedidoServicesService) {
    this.cuentaCompleta = pedidoServices.pedido
   }

  ngOnInit(): void {
    this.fillCuenta()
    console.log(this.pedidoServices.pedido);
  }
  
  fillCuenta(){    
    this.cuentaCompleta.map((pedido:any, index:any)=>{      
      if(pedido.amount > 1){
        pedido.amount = pedido.amount -1
        this.cuentaCompleta.splice(index, 0, pedido);
      }
      return pedido
    })
  }

  printCuenta() {
    // let isCorrectTableNum = this.pendingOrders.find(
    //   (order: any) => order.tableNum == this.tableNum
    // );
    // if (this.tableNum != '' && isCorrectTableNum) {
    //   this.pedidos[0].restaurantId = JSON.parse(sessionStorage.getItem('restaurant')!).id
    //   this.pedidos[0].numTable = this.tableNum
    //   let text = ""
    //   this.printerService.generateBodyCuenta(this.pedidos).subscribe((body: any) => {
    //     text = text.concat(body.text)
    //     text = text.concat(this.generateFooder())
    //     let printers = this.printers.filter((e: any) =>
    //       e.type.includes('cuenta')
    //     );
    //     for (let printer of printers) {
    //       this.printerService.print(printer.name, text).subscribe(() => {})
    //     }
    //   })
    // } else alert('Selecciona una mesa existente');
  }


  dropCuentaCompleta(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    }
  }

  dropCuentaDividida(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    }
  }
}
