import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtrasCreateComponent } from './extras-create.component';

describe('ExtrasCreateComponent', () => {
  let component: ExtrasCreateComponent;
  let fixture: ComponentFixture<ExtrasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtrasCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtrasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
