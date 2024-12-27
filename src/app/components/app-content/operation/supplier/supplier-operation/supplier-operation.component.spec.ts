import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOperationComponent } from './supplier-operation.component';

describe('SupplierOperationComponent', () => {
  let component: SupplierOperationComponent;
  let fixture: ComponentFixture<SupplierOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
