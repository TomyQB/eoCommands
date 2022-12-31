import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-commercial',
  templateUrl: './admin-commercial.component.html',
  styleUrls: ['./admin-commercial.component.scss']
})
export class AdminCommercialComponent implements OnInit {

  comercial = history.state.data;

  constructor() { }

  ngOnInit(): void {
  }

}
