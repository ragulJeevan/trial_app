import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSetupComponent } from './create-setup.component';

describe('CreateSetupComponent', () => {
  let component: CreateSetupComponent;
  let fixture: ComponentFixture<CreateSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
