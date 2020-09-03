import { inject, TestBed } from '@angular/core/testing';
import { BootstrapService } from '../services/bootstrap.service';
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";
import { UsageService } from "../services/usage.service";
import { UserService } from "../services/user.service";


describe('BootstrapService', () =>
{
  let bootstrapService: BootstrapService;
  const spyConfigurationService = jasmine.createSpyObj('ConfigurationService', ['loadAllConfigurations', 'getAllConfigurations','setCurrentUser', 'getCurrentUser']);
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log', 'initialize']);
  const spyUserService = jasmine.createSpyObj('UserService', ['loadAllUsers', 'getAllUsers']);
  const spyUsageService = jasmine.createSpyObj('UsageService', ['loadAllUsage', 'getAllUsage', 'saveUsage']);
  spyConfigurationService.getAllConfigurations.and.returnValue([]);

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      providers:
      [
        { provide: ConfigurationService, useValue: spyConfigurationService },
        { provide: LoggingService, useValue: spyLoggingService },
        { provide: UsageService, useValue: spyUsageService },
        { provide: UserService, useValue: spyUserService }
      ]
    }).compileComponents();

    bootstrapService = TestBed.inject(BootstrapService);

  });

  it('should be created', () =>
  {
    expect(bootstrapService).toBeTruthy();
  });

  describe('constructor', () =>
  {
    it('should call configuration service loadAllConfigurations method', inject([LoggingService, ConfigurationService, UsageService, UserService], (loggingService, configurationService, userService, usageService) =>
    {
      // Act
      const boostrapService = new BootstrapService(loggingService, configurationService, usageService, userService);
      // Assert
      expect(configurationService.loadAllConfigurations).toHaveBeenCalled();
      expect(usageService.loadAllUsage).toHaveBeenCalled();
      expect(userService.loadAllUsers).toHaveBeenCalled();
    }));
  });
});
