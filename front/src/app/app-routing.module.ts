import { AdminCommercialComponent } from './components/admin-commercial/admin-commercial.component';
import { LoginCommercialComponent } from './components/login-commercial/login-commercial.component';
import { AdminCajaComponent } from './components/admin-caja/admin-caja.component';
import { ExtrasCreateComponent } from './components/admin/extras-create/extras-create.component';
import { PlatesAdminComponent } from './components/admin/plates-admin/plates-admin.component';
import { CategoriesAdminComponent } from './components/admin/categories-admin/categories-admin.component';
import { ConfigurationAdminComponent } from './components/admin/configuration-admin/configuration-admin.component';
import { PlatesCreateComponent } from './components/admin/plates-create/plates-create.component';
import { CategoriesCreateComponent } from './components/admin/categories-create/categories-create.component';
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
import { SepararMesaComponent } from './components/tabs/tab-cuenta/separar-mesa/separar-mesa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'restaurant',
    component: CoreComponent,
    children: [
      {
        path: 'menu/:name',
        component: CategoriesComponent,
      },
      {
        path: 'plates',
        component: PlatesComponent,
      },
      {
        path: 'plateInfo',
        component: PlateInfoComponent,
      },
    ],
  },
  {
    path: 'pedidoInfo',
    component: PedidoInfoComponent,
  },
  {
    path: 'confirmacion',
    component: ConfirmacionComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'loginCommercial',
    component: LoginCommercialComponent,
  },
  {
    path: 'restaurantPedidos',
    component: RestaurantPedidosComponent,
  },
  {
    path: 'separarCuenta',
    component: SepararMesaComponent,
  },
  {
    path: 'restaurantPedidosInfo',
    component: RestaurantPedidoInfoComponent,
  },
  {
    path: 'restaurantPedidosBebida',
    component: RestaurantPedidoBebidaComponent,
  },
  {
    path: 'terminos',
    component: TerminosComponent,
  },
  {
    path: 'legal',
    component: LegalComponent,
  },
  {
    path: '',
    component: PaginaPrincipalComponent,
  },
  {
    path: 'adminConfiguracion',
    component: ConfigurationAdminComponent,
  },
  {
    path: 'adminCategories',
    component: CategoriesAdminComponent,
  },
  {
    path: 'adminCategoriesCreate',
    component: CategoriesCreateComponent,
  },
  {
    path: 'adminPlates',
    component: PlatesAdminComponent,
  },
  {
    path: 'adminPlatesCreate',
    component: PlatesCreateComponent,
  },
  {
    path: 'adminExtrasCreate',
    component: ExtrasCreateComponent,
  },
  {
    path: 'adminCaja',
    component: AdminCajaComponent,
  },
  {
    path: 'adminCommercial',
    component: AdminCommercialComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
