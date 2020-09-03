import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UsersComponent } from "../components/users/users.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ConfigurationService } from "../services/configuration.service";
import { ConfigurationServiceMock } from "./mock-configuration.service";
import { UserService } from "../services/user.service";
import { UsageService } from "../services/usage.service";
import { LoggingService } from "../services/logging.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

describe("UsersComponent", () =>
{
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);
  const spyUserService = jasmine.createSpyObj('UserService', ['saveUser']);
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
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () =>
  {
    expect(component).toBeTruthy();
  });
});
