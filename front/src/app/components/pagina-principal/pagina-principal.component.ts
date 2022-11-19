import { PrinterService } from 'src/app/services/printer/printerv1.service';
import { Router } from '@angular/router';
import { RestaurantService } from './../../services/restaurant.service';
import { RestaurantFormMainPage } from './../../models/RestaurantFormMainPage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss']
})
export class PaginaPrincipalComponent implements OnInit {

  restaurant: RestaurantFormMainPage = {
    name: '',
    email: '',
    phone: '',
    coments: ''

  };

  constructor(private restaurantService: RestaurantService, private router: Router, private printService: PrinterService) {
  }

  ngOnInit(): void {
    //PrinterService.getImpresoras().then((printers: any) => console.log(printers))
  }

  sendMessage() {
    this.restaurantService.sendFormMessage(this.restaurant).subscribe(data => {
      alert("mensaje enviado")
      this.restaurant = {
        name: '',
        email: '',
        phone: '',
        coments: ''
      }
    })
  }

  login() {
    this.router.navigateByUrl('login')
  }

}
