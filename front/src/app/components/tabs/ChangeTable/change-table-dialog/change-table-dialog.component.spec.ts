import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTableDialogComponent } from './change-table-dialog.component';

describe('ChangeTableDialogComponent', () => {
  let component: ChangeTableDialogComponent;
  let fixture: ComponentFixture<ChangeTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeTableDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
