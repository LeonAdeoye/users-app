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
  spyUsageService.getUsageApps.and.returnValue(['app1',  'app2']);

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

  describe('getColumnsDefinitions', () =>
  {
    it('should return column header details', () =>
    {
      // Act
      const result = component.getColumnsDefinitions();
      // Assert
      expect(result[0]).toEqual(jasmine.objectContaining({ headerName: 'user', field: 'user', sortable: true, minWidth: 130, width: 130 }));
      expect(result[1]).toEqual(jasmine.objectContaining({ headerName: 'app1', field: 'app1', sortable: true, minWidth: 160, width: 160 }));
      expect(result[2]).toEqual(jasmine.objectContaining({ headerName: 'app2', field: 'app2', sortable: true, minWidth: 160, width: 160 }));
    });
  });
});
