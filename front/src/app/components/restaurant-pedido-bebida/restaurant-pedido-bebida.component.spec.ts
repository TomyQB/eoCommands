import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantPedidoBebidaComponent } from './restaurant-pedido-bebida.component';

describe('RestaurantPedidoBebidaComponent', () => {
  let component: RestaurantPedidoBebidaComponent;
  let fixture: ComponentFixture<RestaurantPedidoBebidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantPedidoBebidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantPedidoBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
