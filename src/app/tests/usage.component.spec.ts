import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { UsageComponent } from "../components/usage/usage.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ConfigurationService } from "../services/configuration.service";
import { ConfigurationServiceMock } from "./mock-configuration.service";
import { UserService } from "../services/user.service";
import { UsageService } from "../services/usage.service";
import { LoggingService } from "../services/logging.service";
import { PopupService } from "../services/popup.service";
import { UserServiceMock } from "./mock-user.service";
import { MatMenuModule } from "@angular/material/menu";
import { UsageServiceMock } from "./mock-usage.service";

describe("UsageComponent", () =>
{
  let component: UsageComponent;
  let fixture: ComponentFixture<UsageComponent>;
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);
  const spyPopupService = jasmine.createSpyObj('PopupService', ['showDeskUsage', 'show']);

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations:
        [
          UsageComponent
        ],
      imports:
        [
          MatMenuModule
        ],
      providers:
        [
          { provide: ConfigurationService, useClass: ConfigurationServiceMock },
          { provide: UserService, useClass: UserServiceMock },
          { provide: UsageService, useClass: UsageServiceMock },
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
