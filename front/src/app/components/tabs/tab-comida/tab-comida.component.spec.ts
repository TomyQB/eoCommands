import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComidaComponent } from './tab-comida.component';

describe('TabComidaComponent', () => {
  let component: TabComidaComponent;
  let fixture: ComponentFixture<TabComidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabComidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
