import { Component, OnInit } from '@angular/core';

import { UserRestaurant } from '../../models/UserRestaurant';
import { UserServicesService } from '../../services/user/user-services.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  user: UserRestaurant = {
    name: "asdf"
  }

  constructor(private services: UserServicesService) { }

  ngOnInit(): void {
    this.services.test(this.user).subscribe(data => {
      console.log(data)
    })
  }

}
