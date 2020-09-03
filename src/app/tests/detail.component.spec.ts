import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { DetailComponent } from '../components/detail/detail.component';
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ConfigurationServiceMock } from "./mock-configuration.service";
import { User } from "../models/user";
import { UserService } from "../services/user.service";
import { UsageService } from "../services/usage.service";

describe('DetailComponent', () =>
{
  let component: DetailComponent;
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);
  const spyUserService = jasmine.createSpyObj('UserService', ['saveUser']);
  const spyUsageService = jasmine.createSpyObj('UsageService', ['saveUsage']);
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations:
      [
        DetailComponent
      ],
      imports:
      [
        HttpClientTestingModule
      ],
      providers:
      [
        { provide: ConfigurationService, useClass: ConfigurationServiceMock },
        { provide: UserService, useValue: spyUserService },
        { provide: UsageService, useValue: spyUsageService },
        { provide: LoggingService, useValue: spyLoggingService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('canClear', () =>
  {
    it('should return false when @Input user is not set', () =>
    {
      // Act
      const result = component.canClear();
      // Assert
      expect(result).not.toBeTruthy();
    });

    it('should still return true when only full name attribute of @Input user is set', () =>
    {
      // Arrange
      component.user = new User("Horatio Adeoye", null, null, null, null, null);
      // Act
      const result = component.canClear();
      // Assert
      expect(result).toBeTruthy();
    });

    it('should still return true when only user ID attribute of @Input user is set', () =>
    {
      // Arrange
      component.user = new User(null, "horaminho", null, null, null, null);
      // Act
      const result = component.canClear();
      // Assert
      expect(result).toBeTruthy();
    });

    it('should return false when none of the attributes of @Input configuration are set', () =>
    {
      // Arrange
      component.user = new User(null, null, null, null, null, null);
      // Act
      const result = component.canClear();
      // Assert
      expect(result).not.toBeTruthy();
    });
  });

  describe('canSave', () =>
  {
    it('should return false when @input user is not set', () =>
    {
      // Act
      const result = component.canSave();
      // Assert
      expect(result).not.toBeTruthy();
    });

    it('should return true only when all attributes of @Input user are set', () =>
    {
      // Arrange
      component.user = new User("Horatio Adeoye", "horaminho", "LFC", "Hong Kong", "HK", "20121223",  "Asia", false);
      // Act
      const result = component.canSave();
      // Assert
      expect(result).toBeTruthy();
    });

    it('should return false when the desk name of @Input user is not set', () =>
    {
      // Arrange
      component.user = new User("Horatio", "Surname", null, "Papa", "now", "20121223");
      // Act
      const result = component.canSave();
      // Assert
      expect(result).not.toBeTruthy();
    });

    it('should return false when the userId of @Input user is not set', () =>
    {
      // Arrange
      component.user = new User("Horatio Adeoye", null, "LFC", "Hong Kong", "HK", "20121223");
      // Act
      const result = component.canSave();
      // Assert
      expect(result).not.toBeTruthy();
    });

    it('should return false when the desk name attribute of @Input configuration is not set', () =>
    {
      // Arrange
      component.user = new User("Horatio Adeoye", "horaminho", null, "Hong Kong", "HK", "20121223");
      // Act
      const result = component.canSave();
      // Assert
      expect(result).not.toBeTruthy();
    });

    it('should return false when the location attribute of @Input configuration is not set', () =>
    {
      // Arrange
      component.user = new User("Horatio Adeoye", "horaminho", "LFC", null, "HK", "20121223");
      // Act
      const result = component.canSave();
      // Assert
      expect(result).not.toBeTruthy();
    });

    it('should return false when the country code attribute of @Input configuration is not set', () =>
    {
      // Arrange
      component.user = new User("Horatio Adeoye", "horaminho", "LFC", "Hong Kong", null, "20121223");
      // Act
      const result = component.canSave();
      // Assert
      expect(result).not.toBeTruthy();
    });

    it('should return false when the ID attribute of @Input configuration is not set', () =>
    {
      // Arrange
      component.user = new User("Horatio Adeoye", "horaminho", "LFC", "Hong Kong", "HK", null);
      // Act
      const result = component.canSave();
      // Assert
      expect(result).not.toBeTruthy();
    });

  });

  describe('save', () =>
  {
    it('should call user service saveUser', inject([UserService], (userService) =>
    {
      // Act
      component.save();
      // Assert
      expect(userService.saveUser).toHaveBeenCalled();
    }));

    it('should call usage service saveUsage', inject([UsageService], (usageService) =>
    {
      // Act
      component.save();
      // Assert
      expect(usageService.saveUsage).toHaveBeenCalled();
    }));
  });

  describe('clear', () =>
  {
    it('should clear user @Input member variable', () =>
    {
      // Arrange
      component.user = new User("Harper Adeoye", "principessa", "DMS", "Hong Kong", "HK", "20121223");
      // Act
      component.clear();
      // Assert
      expect(component.user).toEqual(new User());
    });
  });

  describe('cancel', () =>
  {
    it('should emit close panel event', () =>
    {
      // Arrange
      spyOn(component.closePanelEventEmitter, 'emit');
      // Act
      component.cancel();
      // Assert
      expect(component.closePanelEventEmitter.emit).toHaveBeenCalled();
    });
  });
});
