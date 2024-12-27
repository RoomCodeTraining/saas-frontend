import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialSupplierOperationComponent } from './special-supplier-operation.component';

describe('SpecialSupplierOperationComponent', () => {
  let component: SpecialSupplierOperationComponent;
  let fixture: ComponentFixture<SpecialSupplierOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialSupplierOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialSupplierOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
