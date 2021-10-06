import { RestaurantLogin } from './../../models/RestaurantLogin';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestaurantService } from 'src/app/services/restaurant.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  restaurantLogin: RestaurantLogin = {
    email: "",
    password: ""
  }

  emailFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSignIn() {
    this.restaurantLogin.email = this.emailFormControl.value
    this.restaurantLogin.password = this.passwordFormControl.value

    this.restaurantService.login(this.restaurantLogin).subscribe(data => {

      if(data != null) {
        sessionStorage.setItem('restaurant', JSON.stringify(data))
        this.router.navigateByUrl("/restaurantPedidos");
        // sessionStorage.setItem('userId', data.id.toString())
        // sessionStorage.setItem('rname', data.name)
        // sessionStorage.setItem('image', data.image)
        // sessionStorage.setItem('idImage', data.idImage)

      } else alert("email o contraseña incorectos")
    })
  }

}
