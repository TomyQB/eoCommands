import { userRestaurant } from './../../models/userRestaurant';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { FormControl, Validators } from '@angular/forms';

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

  emailFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignIn() {
    this.userRestaurant.email = this.emailFormControl.value
    this.userRestaurant.password = this.passwordFormControl.value

    this.userService.login(this.userRestaurant).subscribe(data => {
      console.log(data)
      if(data != null) {
        this.router.navigateByUrl("/restaurantPedidos");
        localStorage.setItem('userId', data.id.toString())
        localStorage.setItem('rname', data.name)
      } else {
        alert("email o contraseña incorectos")
      }
    })
  }

}
