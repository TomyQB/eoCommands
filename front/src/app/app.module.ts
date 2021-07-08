import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './components/categories/categories.component';
import { PlatesComponent } from './components/plates/plates.component';
import { PlateInfoComponent } from './components/plate-info/plate-info.component';
import { PedidoComponent } from './share/pedido/pedido.component';
import { PedidoInfoComponent } from './components/pedido-info/pedido-info.component';
import { LoginComponent } from './components/login/login.component';
import { RestaurantPedidosComponent } from './components/restaurant-pedidos/restaurant-pedidos.component'

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    PlatesComponent,
    PlateInfoComponent,
    PedidoComponent,
    PedidoInfoComponent,
    LoginComponent,
    RestaurantPedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
