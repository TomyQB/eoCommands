import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommercialComponent } from './admin-commercial.component';

describe('AdminCommercialComponent', () => {
  let component: AdminCommercialComponent;
  let fixture: ComponentFixture<AdminCommercialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommercialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommercialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
