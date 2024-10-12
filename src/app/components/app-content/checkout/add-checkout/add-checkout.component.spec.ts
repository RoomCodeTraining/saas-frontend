import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCheckoutComponent } from './add-checkout.component';

describe('AddCheckoutComponent', () => {
  let component: AddCheckoutComponent;
  let fixture: ComponentFixture<AddCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
