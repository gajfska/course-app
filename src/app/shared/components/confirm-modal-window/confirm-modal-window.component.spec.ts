import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmModalWindowComponent } from './confirm-modal-window.component';

describe('ConfirmModalWindowComponent', () => {
  let component: ConfirmModalWindowComponent;
  let fixture: ComponentFixture<ConfirmModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmModalWindowComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
