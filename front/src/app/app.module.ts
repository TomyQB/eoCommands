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
import { RestaurantPedidoBebidaComponent } from './components/restaurant-pedido-bebida/restaurant-pedido-bebida.component';
import { TabComidaComponent } from './components/tabs/tab-comida/tab-comida.component';
import { TabBebidaComponent } from './components/tabs/tab-bebida/tab-bebida.component';
import { TabCuentaComponent } from './components/tabs/tab-cuenta/tab-cuenta.component';
import { TabAdminComponent } from './components/tabs/tab-admin/tab-admin.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { TerminosComponent } from './components/terminos/terminos.component';
import { LegalComponent } from './components/legal/legal.component';
import { CategoriesCreateComponent } from './components/admin/categories-create/categories-create.component';
import { PlatesCreateComponent } from './components/admin/plates-create/plates-create.component';
import { PlatesAdminComponent } from './components/admin/plates-admin/plates-admin.component';
import { CategoriesAdminComponent } from './components/admin/categories-admin/categories-admin.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { ExtrasCreateComponent } from './components/admin/extras-create/extras-create.component';
import { AdminCajaComponent } from './components/admin-caja/admin-caja.component';
import { LoginCommercialComponent } from './components/login-commercial/login-commercial.component';
import { AdminCommercialComponent } from './components/admin-commercial/admin-commercial.component';
// import { NgxSpinnerModule} from 'ngx-spinner';
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
    RestaurantPedidoBebidaComponent,
    TabComidaComponent,
    TabBebidaComponent,
    TabCuentaComponent,
    TabAdminComponent,
    ConfirmacionComponent,
    PaginaPrincipalComponent,
    TerminosComponent,
    LegalComponent,
    CategoriesCreateComponent,
    PlatesCreateComponent,
    PlatesAdminComponent,
    CategoriesAdminComponent,
    ModalDeleteComponent,
    ExtrasCreateComponent,
    AdminCajaComponent,
    LoginCommercialComponent,
    AdminCommercialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    // NgxSpinnerModule,
  ],
  entryComponents: [ModalPhoneComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// pk_test_51HZwJtDRmiSLFsD4v5RcApqDX0kKokCoEQzNnnYhwydPSAjF2kqDDX0jYVaz3FOLU1rLbqvAh81QY7xahTxev1Io004DUUbSbT
