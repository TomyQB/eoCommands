import { PaymentIntentDTO } from './../../models/PaymentIntentDTO';
import { PaymentServiceService } from './../../services/payment-service.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Route } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  @ViewChild(StripeCardComponent) card!: StripeCardComponent;

  @Input() price!: number;

  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es',
  };

  public stripeForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(/*private router: Route,*/ public dialog: MatDialogRef<PaymentComponent>, private paymentService: PaymentServiceService, private fb: FormBuilder, private stripeService: StripeService) { }

  ngOnInit(): void {
    console.log(this.price)
  }

  confirmPayment() {
    const name = this.stripeForm.value.name;
    console.log(name)
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          const paymentIntentDTO: PaymentIntentDTO = {
            token: result.token.id,
            price: this.price * 100,
            currency: 'EUR',
          }
          this.paymentService.pay(paymentIntentDTO).subscribe(data => {
            // if(data) {
              this.dialog.close(data)
            // }
          })
        } else if (result.error) {
          alert(result.error.message);
        }
      });
  }

}
