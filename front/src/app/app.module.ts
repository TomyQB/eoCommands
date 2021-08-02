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
import { RestaurantPedidosComponent } from './components/restaurant-pedidos/restaurant-pedidos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialModule } from './share/material/material.module';
import { CoreComponent } from './components/core/core.component';
import { RestaurantPedidoInfoComponent } from './components/restaurant-pedido-info/restaurant-pedido-info.component';

import { NgxStripeModule } from 'ngx-stripe';
import { ModalPhoneComponent } from './components/modal-phone/modal-phone.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    PlatesComponent,
    PlateInfoComponent,
    PedidoComponent,
    PedidoInfoComponent,
    LoginComponent,
    RestaurantPedidosComponent,
    CoreComponent,
    RestaurantPedidoInfoComponent,
    ModalPhoneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxStripeModule.forRoot('pk_test_51HZwJtDRmiSLFsD4v5RcApqDX0kKokCoEQzNnnYhwydPSAjF2kqDDX0jYVaz3FOLU1rLbqvAh81QY7xahTxev1Io004DUUbSbT')
  ],
  entryComponents: [ModalPhoneComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// pk_test_51HZwJtDRmiSLFsD4v5RcApqDX0kKokCoEQzNnnYhwydPSAjF2kqDDX0jYVaz3FOLU1rLbqvAh81QY7xahTxev1Io004DUUbSbT
