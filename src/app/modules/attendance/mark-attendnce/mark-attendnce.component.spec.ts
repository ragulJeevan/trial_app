import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAttendnceComponent } from './mark-attendnce.component';

describe('MarkAttendnceComponent', () => {
  let component: MarkAttendnceComponent;
  let fixture: ComponentFixture<MarkAttendnceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkAttendnceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkAttendnceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
