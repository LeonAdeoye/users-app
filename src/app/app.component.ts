import { Component } from "@angular/core";
import { BootstrapService } from "./services/bootstrap.service";
import { LoggingService } from "./services/logging.service";
import { LogLevel } from "./models/types";
import { ConfigurationService } from "./services/configuration.service";
import { Configuration } from "./models/configuration";
import { Constants } from "./models/constants";


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

  configuration: Configuration;

  public constructor(private bootStrapService: BootstrapService, private loggingService: LoggingService, private configurationService: ConfigurationService)
  {
    this.configurationService.editConfigurationSubject.subscribe((configuration) => this.editConfiguration(configuration));
    this.configurationService.cloneConfigurationSubject.subscribe((configuration) => this.cloneConfiguration(configuration));
    this.configurationService.addConfigurationSubject.subscribe(() => this.addConfiguration());
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

  private addConfiguration(): void
  {
    this.configuration = new Configuration();
    this.toggleUserDetailPanelVisibility();
  }

  private editConfiguration(configuration: Configuration): void
  {
    this.log(`Editing selected configuration ID: ${JSON.stringify(configuration)}`, LogLevel.DEBUG);
    this.configuration = configuration;
    this.toggleUserDetailPanelVisibility();
  }

  private cloneConfiguration(configuration: Configuration): void
  {
    this.log(`Cloning selected configuration ID: ${JSON.stringify(configuration)}`, LogLevel.DEBUG);
    this.configuration = configuration;
    this.toggleUserDetailPanelVisibility();
  }

  public onSelect(selectedTab): void
  {
    this.selectedTab = selectedTab;
  }
}
