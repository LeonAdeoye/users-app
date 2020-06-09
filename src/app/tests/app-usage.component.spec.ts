import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskUsageComponent } from '../components/desk-usage/desk-usage.component';

describe('DeskUsageComponent', () => {
  let component: DeskUsageComponent;
  let fixture: ComponentFixture<DeskUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeskUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
