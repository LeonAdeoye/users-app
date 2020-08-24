import { Component } from "@angular/core";
import { BootstrapService } from "./services/bootstrap.service";
import { LoggingService } from "./services/logging.service";
import { LogLevel } from "./models/types";
import { Constants } from "./models/constants";
import { UserService } from "./services/user.service";
import { User } from "./models/user";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent
{
  private isUserDetailPanelVisibleFlag = false;
  public appName: string = Constants.APP_NAME;
  public selectedTab = "Users";
  public tabs = ["Users", "Usage"];

  user: User;

  public constructor(private bootStrapService: BootstrapService, private loggingService: LoggingService, private userService: UserService)
  {
    this.userService.editUserSubject.subscribe((user) => this.editUser(user));
    this.userService.cloneUserSubject.subscribe((user) => this.cloneUser(user));
    this.userService.addUserSubject.subscribe(() => this.addUser());
  }

  public isUserDetailPanelVisible(): boolean
  {
    return this.isUserDetailPanelVisibleFlag;
  }

  public toggleUserDetailPanelVisibility(): void
  {
    this.isUserDetailPanelVisibleFlag = !this.isUserDetailPanelVisibleFlag;
  }

  private log(message: string, logLevel?: LogLevel): void
  {
    this.loggingService.log("AppComponent", message, logLevel);
  }

  private addUser(): void
  {
    this.log(`Adding new user`, LogLevel.DEBUG);
    this.user = new User();
    this.toggleUserDetailPanelVisibility();
  }

  private editUser(user: User): void
  {
    this.log(`Editing selected user: ${JSON.stringify(user)}`, LogLevel.DEBUG);
    this.user = user;
    this.toggleUserDetailPanelVisibility();
  }

  private cloneUser(user: User): void
  {
    this.log(`Cloning selected user: ${JSON.stringify(user)}`, LogLevel.DEBUG);
    this.user = user;
    this.toggleUserDetailPanelVisibility();
  }

  public onSelect(selectedTab): void
  {
    this.selectedTab = selectedTab;
  }
}
