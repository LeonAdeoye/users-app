import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { UsageComponent } from "../components/usage/usage.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ConfigurationService } from "../services/configuration.service";
import { ConfigurationServiceMock } from "./mock-configuration.service";
import { UserService } from "../services/user.service";
import { UsageService } from "../services/usage.service";
import { LoggingService } from "../services/logging.service";
import { PopupService } from "../services/popup.service";

describe("UsageComponent", () =>
{
  let component: UsageComponent;
  let fixture: ComponentFixture<UsageComponent>;
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);
  const spyUserService = jasmine.createSpyObj('UserService', ['getUniqueDesks', 'getAllUsers']);
  const spyUsageService = jasmine.createSpyObj('UsageService', ['getUsageApps']);
  const spyPopupService = jasmine.createSpyObj('PopupService', ['showDeskUsage', 'show']);
  spyUsageService.getUsageApps.and.returnValue([]);

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations:
        [
          UsageComponent
        ],
      providers:
        [
          { provide: ConfigurationService, useClass: ConfigurationServiceMock },
          { provide: UserService, useValue: spyUserService },
          { provide: UsageService, useValue: spyUsageService },
          { provide: LoggingService, useValue: spyLoggingService },
          { provide: PopupService, useValue: spyPopupService }
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
    fixture = TestBed.createComponent(UsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () =>
  {
    expect(component).toBeTruthy();
  });
});
