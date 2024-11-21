import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSpecialSupplierComponent } from './detail-special-supplier.component';

describe('DetailSpecialSupplierComponent', () => {
  let component: DetailSpecialSupplierComponent;
  let fixture: ComponentFixture<DetailSpecialSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailSpecialSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSpecialSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
