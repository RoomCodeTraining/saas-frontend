import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateOperationComponent } from './delegate-operation.component';

describe('DelegateOperationComponent', () => {
  let component: DelegateOperationComponent;
  let fixture: ComponentFixture<DelegateOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
