import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuntarMesaComponent } from './juntar-mesa.component';

describe('JuntarMesaComponent', () => {
  let component: JuntarMesaComponent;
  let fixture: ComponentFixture<JuntarMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuntarMesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuntarMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
