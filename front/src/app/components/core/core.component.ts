import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  restaurantName: string =localStorage.getItem("name")!;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
