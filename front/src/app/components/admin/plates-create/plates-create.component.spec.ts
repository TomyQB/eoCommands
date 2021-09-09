import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatesCreateComponent } from './plates-create.component';

describe('PlatesCreateComponent', () => {
  let component: PlatesCreateComponent;
  let fixture: ComponentFixture<PlatesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
