import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskUsageComponent } from '../components/desk-usage/desk-usage.component';
import { UserService } from "../services/user.service";
import { UsageService } from "../services/usage.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

describe('DeskUsageComponent', () => {
  let component: DeskUsageComponent;
  let fixture: ComponentFixture<DeskUsageComponent>;
  const spyUserService = jasmine.createSpyObj('UserService', ['getUniqueDesks', 'getAllUsers']);
  const spyUsageService = jasmine.createSpyObj('UsageService', ['getUsageApps']);
  const spyBsModalRef = jasmine.createSpyObj('BsModalRef', ['hide']);
  spyUsageService.getUsageApps.and.returnValue([]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:
        [
          DeskUsageComponent
        ],
      providers:
        [
          { provide: UserService, useValue: spyUserService },
          { provide: UsageService, useValue: spyUsageService },
          { provide: BsModalRef, useValue: spyBsModalRef },
        ],
      schemas:
        [
          CUSTOM_ELEMENTS_SCHEMA
        ]
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
