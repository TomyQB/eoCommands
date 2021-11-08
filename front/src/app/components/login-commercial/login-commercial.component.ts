import { CommercialService } from './../../services/commercial.service';
import { Login } from '../../models/Login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestaurantService } from 'src/app/services/restaurant.service';
import { FormControl, Validators } from '@angular/forms';
import { state } from '@angular/animations';

@Component({
  selector: 'app-login-commercial',
  templateUrl: './login-commercial.component.html',
  styleUrls: ['./login-commercial.component.scss']
})
export class LoginCommercialComponent implements OnInit {

  login: Login = {
    email: "",
    password: ""
  }

  emailFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private commercialService: CommercialService, private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onSignIn() {
    this.login.email = this.emailFormControl.value
    this.login.password = this.passwordFormControl.value

    this.commercialService.login(this.login).subscribe(data => {
      if(data != null) {
        this.router.navigateByUrl("/adminCommercial", {state: {data}});
      } else alert("email o contraseña incorectos")
    })
  }
}
