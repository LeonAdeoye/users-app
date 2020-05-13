import { Injectable } from "@angular/core";
import { LoggingService } from "./logging.service";
import { MessageService } from "./message.service";
import { LogLevel, MessageMethod, MessageTransport, ServiceUpdate } from "../models/types";
import { Message } from "../models/message";
import { Constants } from "../models/constants";
import { Subject } from "rxjs";
import { UtilityService } from "./utility.service";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class UserService
{
  private users = Array<User>();
  public serviceUpdateSubject = new Subject<ServiceUpdate>();

  constructor(private loggingService: LoggingService, private messageService: MessageService)
  {
  }

  private log(message: string, logLevel?: LogLevel): void
  {
    this.loggingService.log("UserService", message, logLevel);
  }

  public loadAllUsers(): void
  {
    const message = new Message(`${Constants.USERS_SERVICE_URL_BASE}/users`, null, MessageTransport.HTTP, MessageMethod.GET);
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
    const message = new Message(`${Constants.USERS_SERVICE_URL_BASE}/user?userId=${userId}`, null, MessageTransport.HTTP, MessageMethod.DELETE);
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

    this.log(`Saving ${user}`, LogLevel.DEBUG);
    const message = new Message(`${Constants.USERS_SERVICE_URL_BASE}/user`, user.toJSON(), MessageTransport.HTTP, UtilityService.isNullOrEmptyOrBlankOrUndefined(user.userId) ? MessageMethod.POST : MessageMethod.PUT);

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
