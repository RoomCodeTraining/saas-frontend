import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrackerComponent } from './list-tracker.component';

describe('ListTrackerComponent', () => {
  let component: ListTrackerComponent;
  let fixture: ComponentFixture<ListTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
