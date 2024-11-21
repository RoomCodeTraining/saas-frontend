import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateStatisticComponent } from './delegate-statistic.component';

describe('DelegateStatisticComponent', () => {
  let component: DelegateStatisticComponent;
  let fixture: ComponentFixture<DelegateStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateStatisticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelegateStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
