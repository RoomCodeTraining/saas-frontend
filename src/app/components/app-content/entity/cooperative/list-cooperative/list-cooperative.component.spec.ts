import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCooperativeComponent } from './list-cooperative.component';

describe('ListCooperativeComponent', () => {
  let component: ListCooperativeComponent;
  let fixture: ComponentFixture<ListCooperativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCooperativeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCooperativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
