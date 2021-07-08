import { userRestaurant } from './../../models/userRestaurant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userRestaurant: userRestaurant = {
    email: "",
    password: ""
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  getUserName(event: any) {
    this.userRestaurant.email = event.target.value
  }

  getPassword(event: any) {
    this.userRestaurant.password = event.target.value
  }

  onSignIn() {
    this.userService.login(this.userRestaurant).subscribe(data => {
      console.log(data)
      this.router.navigateByUrl("/restaurantPedidos", {state: {pedidos: data}});
    })
  }

}
