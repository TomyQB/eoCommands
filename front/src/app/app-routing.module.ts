import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { LegalComponent } from './components/legal/legal.component';
import { TerminosComponent } from './components/terminos/terminos.component';
import { ConfirmacionComponent } from './components/confirmacion/confirmacion.component';
import { RestaurantPedidoBebidaComponent } from './components/restaurant-pedido-bebida/restaurant-pedido-bebida.component';
import { RestaurantPedidoInfoComponent } from './components/restaurant-pedido-info/restaurant-pedido-info.component';
import { CoreComponent } from './components/core/core.component';
import { RestaurantPedidosComponent } from './components/restaurant-pedidos/restaurant-pedidos.component';
import { LoginComponent } from './components/login/login.component';
import { PedidoInfoComponent } from './components/pedido-info/pedido-info.component';
import { PlateInfoComponent } from './components/plate-info/plate-info.component';
import { PlatesComponent } from './components/plates/plates.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'menu/:name',
        component: CategoriesComponent
      },
      {
        path: 'plates',
        component: PlatesComponent
      },
      {
        path: 'plateInfo',
        component: PlateInfoComponent
      },
    ]
  },
  {
    path: 'pedidoInfo',
    component: PedidoInfoComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'restaurantPedidos',
    component: RestaurantPedidosComponent
  },
  {
    path: 'restaurantPedidosInfo',
    component: RestaurantPedidoInfoComponent
  },
  {
    path: 'restaurantPedidosBebida',
    component: RestaurantPedidoBebidaComponent
  },
  {
    path: 'terminos',
    component: TerminosComponent
  },
  {
    path: 'legal',
    component: LegalComponent
  },
  {
    path: 'home',
    component: PaginaPrincipalComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
