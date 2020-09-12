import { Subject } from "rxjs";
import { ServiceUpdate } from "../models/types";
import { Usage } from "../models/usage";
import { User } from "../models/user";

export class UsageServiceMock
{
  public serviceUpdateSubject = new Subject<ServiceUpdate>();

  public getUsageApps(): Array<Usage>
  {
      return[];
  }

  public saveUSage(action: string): void
  {

  }
}
