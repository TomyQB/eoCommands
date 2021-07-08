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
    redirectTo: 'menu/:name',
    pathMatch: 'full',
  },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
