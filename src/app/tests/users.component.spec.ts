import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { UsersComponent } from "../components/users/users.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ConfigurationService } from "../services/configuration.service";
import { ConfigurationServiceMock } from "./mock-configuration.service";
import { UserService } from "../services/user.service";
import { UsageService } from "../services/usage.service";
import { LoggingService } from "../services/logging.service";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { UserServiceMock } from "./mock-user.service";
import { UsageServiceMock } from "./mock-usage.service";
import { MatMenuModule  } from "@angular/material/menu";
import { User } from "../models/user";
import { Subject } from "rxjs";


describe("UsersComponent", () =>
{
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);
  const spyUsageService = jasmine.createSpyObj('UsageService', ['saveUsage']);

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations:
        [
          UsersComponent
        ],
      imports:
        [
          HttpClientTestingModule,
          MatMenuModule
        ],
      providers:
        [
          { provide: ConfigurationService, useClass: ConfigurationServiceMock },
          { provide: UserService, useClass: UserServiceMock },
          { provide: UsageService, useValue: spyUsageService },
          { provide: LoggingService, useValue: spyLoggingService }
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
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () =>
  {
    expect(component).toBeTruthy();
  });

  describe('refreshUsers', () =>
  {
    it('should call loadAllUsers of the user service', inject([UserService], (userService) =>
    {
      // Arrange
      spyOn(userService, 'loadAllUsers');
      // Act
      component.refreshUsers();
      // Assert
      expect(userService.loadAllUsers).toHaveBeenCalled();
    }));
  });

  describe('cloneUser', () =>
  {
    it('should call saveUsage of the usage service', inject([UsageService], (usageService) =>
    {
      // Act
      component.cloneUser();
      // Assert
      expect(usageService.saveUsage).toHaveBeenCalled();
    }));

    it('should call getSelectedUser of the component', () =>
    {
      // Arrange
      spyOn(component, "getSelectedUser").and.returnValue(new User());
      // Act
      component.cloneUser();
      // Assert
      expect(component.getSelectedUser).toHaveBeenCalled();
    });

    it('should call cloneUserSubject of the user service', inject([UserService], (userService) =>
    {
      // Arrange
      spyOn(userService.cloneUserSubject, "next");
      spyOn(component,"getSelectedUser").and.returnValue(new User());
      // Act
      component.cloneUser();
      // Assert
      expect(userService.cloneUserSubject.next).toHaveBeenCalled();
    }));
  });

  describe('editUser', () =>
  {
    it('should call saveUsage of the usage service', inject([UsageService], (usageService) =>
    {
      // Act
      component.editUser();
      // Assert
      expect(usageService.saveUsage).toHaveBeenCalled();
    }));

    it('should call getSelectedUser of the component', () =>
    {
      // Arrange
      spyOn(component, "getSelectedUser").and.returnValue(new User());
      // Act
      component.editUser();
      // Assert
      expect(component.getSelectedUser).toHaveBeenCalled();
    });

    it('should call editUserSubject of the user service', inject([UserService], (userService) =>
    {
      // Arrange
      spyOn(userService.editUserSubject, "next");
      spyOn(component,"getSelectedUser").and.returnValue(new User());
      // Act
      component.editUser();
      // Assert
      expect(userService.editUserSubject.next).toHaveBeenCalled();
    }));
  });

  describe('toggleValidity', () =>
  {
    it('should call toggleValidity of the user service', inject([UserService], (userService) =>
    {
      // Arrange
      spyOn(userService, "toggleValidity");
      spyOn(component, "getSelectedUser").and.returnValue(new User());
      // Act
      component.toggleValidity();
      // Assert
      expect(userService.toggleValidity).toHaveBeenCalled();
    }));

    it('should call saveUsage of the usage service', inject([UsageService], (usageService) =>
    {
      // Act
      component.toggleValidity();
      // Assert
      expect(usageService.saveUsage).toHaveBeenCalled();
    }));
  });

  describe('addUser', () =>
  {
    it('should call saveUsage of the usage service', inject([UsageService], (usageService) =>
    {
      // Act
      component.addUser();
      // Assert
      expect(usageService.saveUsage).toHaveBeenCalled();
    }));

    it('should call next of the user service addUserSubject', inject([UserService], (userService) =>
    {
      // Arrange
      spyOn(userService.addUserSubject, "next");
      // Act
      component.addUser();
      // Assert
      expect(userService.addUserSubject.next).toHaveBeenCalled();
    }));
  });
});
