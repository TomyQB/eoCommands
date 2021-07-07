import { Category } from './../../models/Category';
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { MenuServicesService } from '../../services/menu-services.service'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories!: Category[]

  constructor(private menuServices: MenuServicesService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.getUrlId();

    this.menuServices.getMenu().subscribe(data => {
      this.categories = data
      console.log(this.categories)
    })
  }

  private getUrlId() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    if(id != null) {
      localStorage.setItem('id', id);
    }
  }

  plateView(i: number) {
    this.router.navigateByUrl("/plates", {state: {plates: this.categories[i].plates}});
  }

}
