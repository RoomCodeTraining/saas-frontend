import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWarehouseDeliveryComponent } from './list-warehouse-delivery.component';

describe('ListWarehouseDeliveryComponent', () => {
  let component: ListWarehouseDeliveryComponent;
  let fixture: ComponentFixture<ListWarehouseDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListWarehouseDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWarehouseDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
