import { PendingOrderService } from 'src/app/services/pending-order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-caja',
  templateUrl: './admin-caja.component.html',
  styleUrls: ['./admin-caja.component.scss']
})
export class AdminCajaComponent implements OnInit {

  ordersRecord: any
  restaurantId: number = JSON.parse(sessionStorage.getItem('restaurant')!).id

  constructor(private pendingOrderService:  PendingOrderService) { }

  ngOnInit(): void {
    this.getOrdersRecord();
  }

  getOrdersRecord() {
    this.pendingOrderService.getAllOrdersRecord(this.restaurantId).subscribe(data => {
      console.log(data)
      this.ordersRecord = data
    })
  }

  deleteCaja() {
    this.pendingOrderService.deleteOrdersRecord(this.restaurantId).subscribe(data => {
      this.getOrdersRecord();
    })
  }

}
