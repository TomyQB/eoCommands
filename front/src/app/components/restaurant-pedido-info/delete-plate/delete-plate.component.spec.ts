import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePlateComponent } from './delete-plate.component';

describe('DeletePlateComponent', () => {
  let component: DeletePlateComponent;
  let fixture: ComponentFixture<DeletePlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletePlateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
