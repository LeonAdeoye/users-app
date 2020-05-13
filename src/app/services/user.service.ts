import { Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";
import { MessageService } from "./message.service";
import { LogLevel, MessageMethod, MessageTransport, ServiceUpdate } from "../models/types";
import { Message } from "../models/message";
import { Subject } from "rxjs";
import { UtilityService } from "./utility.service";
import { User } from "../models/user";
import { ConfigurationService } from "./configuration.service";

@Injectable({
  providedIn: "root"
})
export class UserService
{
  private users = Array<User>();
  public serviceUpdateSubject = new Subject<ServiceUpdate>();
  private readonly configurationServiceURLBase: string;

  constructor(private loggingService: LoggingService, private messageService: MessageService, private configurationService: ConfigurationService)
  {
    this.configurationServiceURLBase = this.configurationService.getConfigurationValue("system", "users-service.url", "http://localhost:20003");
  }

  private log(message: string, logLevel?: LogLevel): void
  {
    this.loggingService.log("UserService", message, logLevel);
  }

  public loadAllUsers(): void
  {
    const message = new Message(`${this.configurationServiceURLBase}/users`, null, MessageTransport.HTTP, MessageMethod.GET);
    this.messageService.send(message).subscribe((users) =>
    {
        try
        {
          this.users = User.deserializeArray(users);
          this.log(`Retrieved ${users.length} users from the users micro-service.`, LogLevel.INFO);
          this.log(`Users details: ${JSON.stringify(users)}`, LogLevel.INFO);
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

  public getAllConfigurations(): Array<User>
  {
    return this.users;
  }

  public invalidateUser(userId: string): void
  {
    this.log(`Invalidating user with user Id: ${userId}`, LogLevel.DEBUG);
    const message = new Message(`${this.configurationServiceURLBase}/user?userId=${userId}`, null, MessageTransport.HTTP, MessageMethod.DELETE);
    this.messageService.send(message).subscribe(
      (result) =>
      {
        if(result)
          this.log(`result: ${result}`, LogLevel.DEBUG);
        this.loadAllUsers();
      },
      (error) =>
      {
        if(error)
          this.log(`${error.message}`, LogLevel.ERROR);
      });
  }

  public saveUser(user: User): void
  {
    this.log(`Saving user: ${user}`, LogLevel.DEBUG);
    const message = new Message(`${this.configurationServiceURLBase}/user`, user.toJSON(), MessageTransport.HTTP, UtilityService.isNullOrEmptyOrBlankOrUndefined(user.userId) ? MessageMethod.POST : MessageMethod.PUT);

    this.messageService.send(message).subscribe(
      (result) =>
      {
        if(result)
          this.log(`result: ${result}`, LogLevel.DEBUG);

        this.loadAllUsers();
      },
      (error) =>
      {
        if(error)
          this.log(`${error.message}`, LogLevel.ERROR);
      });
  }

  getConfigurationValue(userId: string): User
  {
    for (let index = 0; index < this.users.length; ++index)
    {
      if (this.users[index].userId === userId)
        return this.users[index];
    }
    return null;
  }
}
