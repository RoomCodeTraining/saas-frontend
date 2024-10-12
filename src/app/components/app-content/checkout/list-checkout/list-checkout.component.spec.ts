import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCheckoutComponent } from './list-checkout.component';

describe('ListCheckoutComponent', () => {
  let component: ListCheckoutComponent;
  let fixture: ComponentFixture<ListCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
