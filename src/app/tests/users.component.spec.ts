import { async, ComponentFixture, TestBed } from "@angular/core/testing";
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


describe("UsersComponent", () =>
{
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);

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
          { provide: UsageService, useClass: UsageServiceMock },
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
});
