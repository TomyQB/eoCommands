import { Plate } from './../../models/Plate';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plates',
  templateUrl: './plates.component.html',
  styleUrls: ['./plates.component.scss']
})
export class PlatesComponent implements OnInit {

  plates: Plate[] = history.state.plates

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.plates)
  }

  plateInfoView(i: number) {
    this.router.navigateByUrl("/plateInfo", {state: {plate: this.plates[i]}});
  }

}
