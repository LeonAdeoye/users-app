import { Subject } from "rxjs";
import { ServiceUpdate } from "../models/types";
import { User } from "../models/user";

export class UserServiceMock
{
  public serviceUpdateSubject = new Subject<ServiceUpdate>();
  public addUserSubject = new Subject<User>();
  public editUserSubject = new Subject<User>();
  public cloneUserSubject = new Subject<User>();

  public getAllUsers(): Array<User>
  {
    return [];
  }

  public loadAllUsers(): void
  {
  }

  public toggleValidity(user: User): void
  {
  }

  public getUniqueDesks(): Array<User>
  {
    return [];
  }
}
