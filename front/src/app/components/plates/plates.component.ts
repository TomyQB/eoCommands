import { Category } from './../../models/Category';
import { Plate } from './../../models/Plate';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HashService } from '../../services/hash.service'
import { DescAndAmount } from 'src/app/models/DescAndAmount';

@Component({
  selector: 'app-plates',
  templateUrl: './plates.component.html',
  styleUrls: ['./plates.component.scss']
})
export class PlatesComponent implements OnInit {

  // plates: Plate[] = history.state.plates
  // category: Category = history.state.category
  plates: Plate[] = JSON.parse(localStorage.getItem('plat')!)
  category: Category = JSON.parse(localStorage.getItem('cat')!)


  dic: {[key: string]: DescAndAmount} = {}

  constructor(private router: Router, private hashService: HashService) { }

  ngOnInit(): void {
    this.hashService.createDictionary(this.plates)
    this.dic = this.hashService.getElement()
  }

  plateInfoView(i: number) {
    this.router.navigateByUrl("/restaurant/plateInfo", {state: {plate: this.plates[i]}});
  }

  goCategoriesPage() {
    localStorage.removeItem('plat')
    localStorage.removeItem('cat')
    this.router.navigateByUrl("/restaurant/menu/" + localStorage.getItem("name"));
  }

}