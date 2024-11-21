import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialSupplierStatisticComponent } from './special-supplier-statistic.component';

describe('SpecialSupplierStatisticComponent', () => {
  let component: SpecialSupplierStatisticComponent;
  let fixture: ComponentFixture<SpecialSupplierStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialSupplierStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialSupplierStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
