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
  public editUserSubject = new Subject<User>();
  public cloneUserSubject = new Subject<User>();
  public addUserSubject = new Subject<User>();
  private readonly usersServiceURLBase: string;

  constructor(private loggingService: LoggingService, private messageService: MessageService, private configurationService: ConfigurationService)
  {
    this.usersServiceURLBase = this.configurationService.getConfigurationValue("system", "users-service.url", "http://localhost:20003");
  }

  private log(message: string, logLevel?: LogLevel): void
  {
    this.loggingService.log("UserService", message, logLevel);
  }

  public loadAllUsers(): void
  {
    const message = new Message(`${this.usersServiceURLBase}/users`, null, MessageTransport.HTTP, MessageMethod.GET);
    this.messageService.send(message).subscribe((users) =>
    {
        try
        {
          this.users = User.deserializeArray(users);
          this.log(`Retrieved ${users.length} users from the users-service.`, LogLevel.INFO);
          this.log(`Users details: ${JSON.stringify(users)}`, LogLevel.INFO);
          this.serviceUpdateSubject.next(ServiceUpdate.REFRESH);
        }
        catch (err)
        {
          this.log(err.message, LogLevel.ERROR);
        }
    },
    (error) =>
    {
      if (error)
        this.log(`${error.message}`, LogLevel.ERROR);
    });
  }

  public getAllUsers(): Array<User>
  {
    return this.users;
  }

  public getUsersDeskName(fullName: string): string
  {
    return this.users.find((elem) => fullName === elem.fullName).deskName;
  }

  public toggleValidity(user: User): void
  {
    this.log(`Toggling the validity of user with user Id: ${user.userId} and then saving it.`, LogLevel.DEBUG);
    user.isActive = !user.isActive;
    this.saveUser(user);
  }

  public saveUser(user: User): void
  {
    this.log(`Saving user: ${JSON.stringify(user)}`, LogLevel.DEBUG);
    const message = new Message(`${this.usersServiceURLBase}/user`, user.toJSON(), MessageTransport.HTTP, UtilityService.isNullOrEmptyOrBlankOrUndefined(user.id) ? MessageMethod.POST : MessageMethod.PUT);

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

  public getUniqueDesks(): Array<User>
  {
    const uniqueDesks: User[] = [];

    this.users.forEach( (user) =>
    {
      if(uniqueDesks.findIndex( currentUser => currentUser.deskName === user.deskName) === -1)
        uniqueDesks.push(user);
    });

    return uniqueDesks;
  }
}
