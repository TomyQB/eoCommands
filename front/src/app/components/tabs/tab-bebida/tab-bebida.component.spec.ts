import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBebidaComponent } from './tab-bebida.component';

describe('TabBebidaComponent', () => {
  let component: TabBebidaComponent;
  let fixture: ComponentFixture<TabBebidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabBebidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabBebidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
