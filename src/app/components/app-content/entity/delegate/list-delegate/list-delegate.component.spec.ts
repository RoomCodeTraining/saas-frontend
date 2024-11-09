import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDelegateComponent } from './list-delegate.component';

describe('ListDelegateComponent', () => {
  let component: ListDelegateComponent;
  let fixture: ComponentFixture<ListDelegateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDelegateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDelegateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
