import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDelegateForDeliveryComponent } from './list-delegate-for-delivery.component';

describe('ListDelegateForDeliveryComponent', () => {
  let component: ListDelegateForDeliveryComponent;
  let fixture: ComponentFixture<ListDelegateForDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDelegateForDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDelegateForDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
