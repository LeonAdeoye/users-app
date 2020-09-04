import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupComponent } from '../components/popup/popup.component';
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;

  beforeEach(async(() =>
  {
    const spyBsModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);
    TestBed.configureTestingModule({
      declarations:
        [
          PopupComponent
        ],
      providers:
        [
          { provide: BsModalRef, useValue: spyBsModalRef },
          BsModalService
        ],
      schemas:
        [
          CUSTOM_ELEMENTS_SCHEMA
        ]
    })
    .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    component.bsModalRef = TestBed.inject(BsModalRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
