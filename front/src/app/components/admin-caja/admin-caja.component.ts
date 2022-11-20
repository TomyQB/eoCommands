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
  total: number = 0;

  constructor(private pendingOrderService:  PendingOrderService) { }

  ngOnInit(): void {
    this.getOrdersRecord();
  }

  getOrdersRecord() {
    this.pendingOrderService.getAllOrdersRecord(this.restaurantId).subscribe(data => {
      this.ordersRecord = data
      data.forEach((order: any) => {
        if (order.plate) this.total += order.amount * order.plate.price
        if (order.additional) this.total += order.amount * order.additional.price
        this.total = Math.round(this.total*100)/100
      });
    })
  }

  deleteCaja() {
    this.pendingOrderService.deleteOrdersRecord(this.restaurantId).subscribe(data => {
      this.total = 0;
      this.getOrdersRecord();
    })
  }


}
