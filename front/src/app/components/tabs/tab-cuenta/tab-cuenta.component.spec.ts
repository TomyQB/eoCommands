import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCuentaComponent } from './tab-cuenta.component';

describe('TabCuentaComponent', () => {
  let component: TabCuentaComponent;
  let fixture: ComponentFixture<TabCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
