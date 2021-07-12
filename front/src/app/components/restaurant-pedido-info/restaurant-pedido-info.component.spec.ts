import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantPedidoInfoComponent } from './restaurant-pedido-info.component';

describe('RestaurantPedidoInfoComponent', () => {
  let component: RestaurantPedidoInfoComponent;
  let fixture: ComponentFixture<RestaurantPedidoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantPedidoInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantPedidoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
