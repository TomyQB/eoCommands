import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab-admin',
  templateUrl: './tab-admin.component.html',
  styleUrls: ['./tab-admin.component.scss']
})
export class TabAdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  adminMenu() {
    this.router.navigateByUrl("/adminCategories");
  }

  adminCaja() {
    this.router.navigateByUrl("/adminCaja");
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('login')
  }

}
