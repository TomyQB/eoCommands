import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  restaurantName: string = localStorage.getItem("name")!;
  showOrder: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if(this.router.url === "/plateInfo") {
        this.showOrder = false;
      } else {
        this.showOrder = true;
      }
    });
  }

  ngOnInit(): void {
  }

}
