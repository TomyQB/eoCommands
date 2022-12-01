import { TotalOrdersRecord } from './../../../models/TotalOrdersRecord';
import { TotalOrdersRecordService } from './../../../services/total-orders-record.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-admin',
  templateUrl: './tab-admin.component.html',
  styleUrls: ['./tab-admin.component.scss'],
})
export class TabAdminComponent implements OnInit {
  constructor(
    private router: Router,
    public totalOrdersRecordService: TotalOrdersRecordService
  ) {}

  ngOnInit(): void {
    this.totalOrdersRecordService
      .getTotalOrdersRecord(
        JSON.parse(sessionStorage.getItem('restaurant')!).id
      )
      .subscribe((data) => {
        this.totalOrdersRecordService.orderRecord = data;
      });
  }

  adminMenu() {
    this.router.navigateByUrl('/adminCategories');
  }

  adminCaja() {
    this.router.navigateByUrl('/adminCaja');
  }

  adminConfiguracion() {
    this.router.navigateByUrl('/adminConfiguracion');
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('login');
  }
}
