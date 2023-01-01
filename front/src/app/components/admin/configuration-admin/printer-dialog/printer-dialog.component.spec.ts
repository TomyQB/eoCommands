import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterDialogComponent } from './printer-dialog.component';

describe('PrinterDialogComponent', () => {
  let component: PrinterDialogComponent;
  let fixture: ComponentFixture<PrinterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrinterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrinterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
