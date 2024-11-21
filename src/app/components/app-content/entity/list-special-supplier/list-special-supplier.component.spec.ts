import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpecialSupplierComponent } from './list-special-supplier.component';

describe('ListSpecialSupplierComponent', () => {
  let component: ListSpecialSupplierComponent;
  let fixture: ComponentFixture<ListSpecialSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSpecialSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSpecialSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
