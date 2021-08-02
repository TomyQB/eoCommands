import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantPedidosComponent } from './restaurant-pedidos.component';

describe('RestaurantPedidosComponent', () => {
  let component: RestaurantPedidosComponent;
  let fixture: ComponentFixture<RestaurantPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
