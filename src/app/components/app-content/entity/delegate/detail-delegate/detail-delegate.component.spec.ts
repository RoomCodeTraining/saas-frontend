import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDelegateComponent } from './detail-delegate.component';

describe('DetailDelegateComponent', () => {
  let component: DetailDelegateComponent;
  let fixture: ComponentFixture<DetailDelegateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailDelegateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDelegateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
