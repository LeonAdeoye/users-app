import { Subject } from "rxjs";
import { ServiceUpdate } from "../models/types";
import { Usage } from "../models/usage";

export class UsageServiceMock
{
  public serviceUpdateSubject = new Subject<ServiceUpdate>();

  public getUsageApps(): Array<Usage>
  {
      return[];
  }
}
