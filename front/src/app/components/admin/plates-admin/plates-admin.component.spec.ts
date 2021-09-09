import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatesAdminComponent } from './plates-admin.component';

describe('PlatesAdminComponent', () => {
  let component: PlatesAdminComponent;
  let fixture: ComponentFixture<PlatesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
