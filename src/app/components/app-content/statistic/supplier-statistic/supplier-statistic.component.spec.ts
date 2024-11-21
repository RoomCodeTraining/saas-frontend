import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierStatisticComponent } from './supplier-statistic.component';

describe('SupplierStatisticComponent', () => {
  let component: SupplierStatisticComponent;
  let fixture: ComponentFixture<SupplierStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
