import { JsonConvert, JsonObject, JsonProperty, ValueCheckingMode } from "json2typescript";

@JsonObject
export class Usage
{
  @JsonProperty("id", String)
  private _id: string;

  @JsonProperty("app", String)
  private _app: string;

  @JsonProperty("user", String)
  private _user: string;

  @JsonProperty("action", String)
  private _action: string;

  @JsonProperty("lastUsageDate", String)
  private _lastUsageDate: string;

  @JsonProperty("monthlyCount", String)
  private _monthlyCount: Array<string>;

  public constructor(app?: string, user?: string, action?: string, lastUsageDate?: string, monthlyCount?: Array<string>, id?: string)
  {
    this._app = app || "";
    this._user = user || "";
    this._action = action || "";
    this._lastUsageDate = lastUsageDate || "";
    this._monthlyCount = monthlyCount || new Array<string>();
    this._id = id;
  }

  public toString(): string
  {
    return `{id: ${this.id}, app: ${this.app}, user: ${this.user}, action: ${this.action}, lastUsageDate: ${this.lastUsageDate}, monthlyCount: ${this.monthlyCount}}`;
  }

  public toJSON(): any
  {
    return {
      id: this.id,
      app: this.app,
      user: this.user,
      action: this.action,
      lastUsageDate: this.lastUsageDate,
      monthlyCount: this.monthlyCount
    };
  }

  public get id(): string
  {
    return this._id;
  }

  public set id(id: string)
  {
    this._id = id;
  }

  public get app(): string
  {
    return this._app;
  }

  public set app(app: string)
  {
    this._app = app;
  }

  public get user(): string
  {
    return this._user;
  }

  public set user(user: string)
  {
    this._user = user;
  }

  public get action(): string
  {
    return this._action;
  }

  public set action(action: string)
  {
    this._action = action;
  }

  public get lastUsageDate(): string
  {
    return this._lastUsageDate;
  }

  public set lastUsageDate(lastUsageDate: string)
  {
    this._lastUsageDate = lastUsageDate;
  }

  public get monthlyCount(): Array<string>
  {
    return this._monthlyCount;
  }

  public set monthlyCount(monthlyCount: Array<string>)
  {
    this._monthlyCount = monthlyCount;
  }

  public static deserialize(jsonObject: any): Usage
  {
    try
    {
      const jsonConverter: JsonConvert = new JsonConvert();
      jsonConverter.ignorePrimitiveChecks = false;
      jsonConverter.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
      return jsonConverter.deserializeObject(jsonObject, Usage);
    }
    catch(err)
    {
      throw new Error(`Error occurred while serializing object: ${JSON.stringify(jsonObject)}`);
    }
  }

  public static deserializeArray(jsonObjectArray: any): Array<Usage>
  {
    try
    {
      const jsonConverter: JsonConvert = new JsonConvert();
      jsonConverter.ignorePrimitiveChecks = false;
      jsonConverter.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
      return jsonConverter.deserializeArray(jsonObjectArray, Usage);
    }
    catch(err)
    {
      throw new Error(`Error occurred while serializing array: ${JSON.stringify(jsonObjectArray)}`);
    }
  }
}
