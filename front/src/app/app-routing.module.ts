import { PedidoInfoComponent } from './components/pedido-info/pedido-info.component';
import { PlateInfoComponent } from './components/plate-info/plate-info.component';
import { PlatesComponent } from './components/plates/plates.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu/:id',
    pathMatch: 'full',
  },
  {
    path: 'menu/:id',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
