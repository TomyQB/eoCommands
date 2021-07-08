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
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'restaurantPedidos',
        component: RestaurantPedidosComponent
      },
    ]
  },
  {
    path: 'pedidoInfo',
    component: PedidoInfoComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
