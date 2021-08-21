import { RestaurantService } from './../../services/restaurant.service';
import { RestaurantFormMainPage } from './../../models/RestaurantFormMainPage';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss']
})
export class PaginaPrincipalComponent implements OnInit {

  restaurant: RestaurantFormMainPage;

  constructor(private restaurantService: RestaurantService) {
    this.restaurant = {
      name: '',
      email: '',
      phone: ''
    }
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.restaurantService.sendFormMessage(this.restaurant).subscribe(data => {
      alert("mensaje enviado")
      this.restaurant = {
        name: '',
        email: '',
        phone: ''
      }
    })
  }

}
