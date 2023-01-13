import { Login } from '../../models/Login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestaurantService } from 'src/app/services/restaurant.service';
import { FormControl, Validators } from '@angular/forms';
import { PrinterService } from 'src/app/services/printer/printerv1.service';
import { CurrencySumbolService } from 'src/app/services/currency-sumbol.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  restaurantLogin: Login = {
    email: '',
    password: '',
  };

  emailFormControl = new FormControl('', [Validators.required]);

  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private currencySumbolService: CurrencySumbolService
  ) {}

  ngOnInit(): void {
    this.currencySumbolService.setCurrencySymbol().subscribe((data) => {
      this.currencySumbolService.symbol = data.currency.symbol;
    });
  }

  ngOnDestroy(): void {}

  onSignIn() {
    this.restaurantLogin.email = this.emailFormControl.value;
    this.restaurantLogin.password = this.passwordFormControl.value;

    this.restaurantService.login(this.restaurantLogin).subscribe((data) => {
      if (data != null) {
        sessionStorage.setItem('restaurant', JSON.stringify(data));
        this.router.navigateByUrl('/restaurantPedidos');
      } else alert('email o contraseña incorectos');
    });
  }
}
