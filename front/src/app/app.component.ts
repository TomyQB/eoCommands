import { Component } from '@angular/core';
import { RestaurantService } from './services/restaurant.service';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  constructor(private webSocketService: WebSocketService) {}


  ngOnInit(): void {
    this.webSocketService.connect()
  }
}
