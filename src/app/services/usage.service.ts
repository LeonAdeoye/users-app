import { Injectable } from "@angular/core";

import { MessageService } from "./message.service";
import { Message } from "../models/message";
import { ConfigurationService } from "./configuration.service";
import { LogLevel, MessageMethod, MessageTransport, ServiceUpdate } from "../models/types";
import { Constants } from "../models/constants";
import { LoggingService } from "./logging.service";
import { Subject } from "rxjs";
import { Usage } from "../models/usage";

@Injectable({
  providedIn: "root"
})
export class UsageService
{
  private usageMap = new Map<string, Array<Usage>>();
  private usageApps = new Array<string>();
  private usage = new Array<Usage>();
  private deskDrilldownSubject: Subject<string>;

  public serviceUpdateSubject = new Subject<ServiceUpdate>();
  private readonly usersServiceURLBase: string;

  constructor(private messageService: MessageService, private configurationService: ConfigurationService, private loggingService: LoggingService)
  {
    this.usersServiceURLBase = this.configurationService.getConfigurationValue("system", "users-service.url", "http://localhost:20003");
    this.deskDrilldownSubject = new Subject<string>();
  }

  public setDeskDrilldown(deskName: string): void
  {
    this.deskDrilldownSubject.next(deskName);
  }

  private log(message: string, logLevel?: LogLevel): void
  {
    this.loggingService.log("UsageService", message, logLevel);
  }

  public saveUsage(action: string): void
  {
    this.log(`Saving usage action: ${action}`, LogLevel.DEBUG);
    const url = `${this.usersServiceURLBase}/usage?app=${Constants.APP_NAME}&user=${this.configurationService.getCurrentUser()}&action=${action}`;
    this.messageService.send(new Message(url, null, MessageTransport.HTTP, MessageMethod.POST)).subscribe(
      (result) =>
      {
        if(result)
          this.log(`Successfully saved usage: ${JSON.stringify(result)}`, LogLevel.DEBUG);
      },
      (error) =>
      {
        if(error)
          this.log(`${error.message}`, LogLevel.ERROR);
      });
  }

  public loadAllUsage(): void
  {
    const message = new Message(`${this.usersServiceURLBase}/usage`, null, MessageTransport.HTTP, MessageMethod.GET);
    this.messageService.send(message).subscribe((usage) =>
      {
        try
        {
          this.usageMap.clear();
          for(let index = 0; index < usage.length; ++index)
          {
            const appName = usage[index].app;
            if(!this.usageMap.has(appName))
              this.usageMap.set(appName, [usage[index]]);
            else
              this.usageMap.get(appName).push(usage[index]);
          }
          this.log(`Retrieved ${usage.length} usage from the users-service.`, LogLevel.INFO);
          this.serviceUpdateSubject.next(ServiceUpdate.REFRESH);
        }
        catch(err)
        {
          this.log(err.message, LogLevel.ERROR);
        }
      },
      (error) =>
      {
        if(error)
          this.log(`${error.message}`, LogLevel.ERROR);
      });
  }

  public getAppUsage(app: string): Array<Usage>
  {
    return this.usageMap.get(app);
  }

  public getAllUsage(): Array<Usage>
  {
    return this.usage;
  }

  public getUsageApps(): Array<string>
  {
    return Array.from(this.usageMap.keys());
  }
}
