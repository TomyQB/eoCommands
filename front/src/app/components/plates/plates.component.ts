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

  plates: Plate[] = history.state.plates

  dic: {[key: string]: DescAndAmount} = {}

  constructor(private router: Router, private hashService: HashService) { }

  ngOnInit(): void {
    this.hashService.createDictionary(this.plates)
    this.dic = this.hashService.getElement()
    console.log(this.hashService.getElement())
    console.log(this.plates)
  }

  plateInfoView(i: number) {
    this.router.navigateByUrl("/plateInfo", {state: {plate: this.plates[i]}});
  }

}
