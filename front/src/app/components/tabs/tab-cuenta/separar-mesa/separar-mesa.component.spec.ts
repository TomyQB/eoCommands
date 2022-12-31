import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SepararMesaComponent } from './separar-mesa.component';

describe('SepararMesaComponent', () => {
  let component: SepararMesaComponent;
  let fixture: ComponentFixture<SepararMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SepararMesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SepararMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
