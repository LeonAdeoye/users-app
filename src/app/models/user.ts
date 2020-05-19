import { JsonConvert, JsonObject, JsonProperty, ValueCheckingMode } from "json2typescript";

@JsonObject
export class User
{
  @JsonProperty("id", String)
  private _id: string;

  @JsonProperty("fullName", String)
  private _fullName: string;

  @JsonProperty("userId", String)
  private _userId: string;

  @JsonProperty("deskName", String)
  private _deskName: string;

  @JsonProperty("location", String)
  private _location: string;

  @JsonProperty("countryCode", String)
  private _countryCode: string;

  @JsonProperty("region", String)
  private _region: string;

  @JsonProperty("active", Boolean)
  private _isActive: boolean;

  public constructor(fullName?: string, userId?: string, deskName?: string, location?: string, countryCode?: string, id?: string, region?: string, isActive?: boolean)
  {
    this._fullName = fullName || "";
    this._userId = userId || "";
    this._deskName = deskName || "";
    this._location = location || "";
    this._region = region || "";
    this._countryCode = countryCode || "";
    this._id = id;
    this._isActive = isActive || false;
  }

  public toString(): string
  {
    return `{id: ${this.id}, fullName: ${this.fullName}, userId: ${this.userId}, deskName: ${this.deskName}, location: ${this.location}, isActive: ${this.isActive}, region: ${this.region}, countryCode: ${this.countryCode}}`;
  }

  public toJSON(): any
  {
    return {
      id: this.id,
      fullName: this.fullName,
      userId: this.userId,
      deskName: this.deskName,
      location: this.location,
      region: this.region,
      countryCode: this.countryCode,
      active: this.isActive
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

  public get fullName(): string
  {
    return this._fullName;
  }

  public set fullName(fullName: string)
  {
    this._fullName = fullName;
  }

  public get userId(): string
  {
    return this._userId;
  }

  public set userId(userId: string)
  {
    this._userId = userId;
  }

  public get deskName(): string
  {
    return this._deskName;
  }

  public set deskName(deskName: string)
  {
    this._deskName = deskName;
  }

  public get location(): string
  {
    return this._location;
  }

  public set location(location: string)
  {
    this._location = location;
  }

  public get region(): string
  {
    return this._region;
  }

  public set region(region: string)
  {
    this._region = region;
  }

  public get countryCode(): string
  {
    return this._countryCode;
  }

  public set countryCode(countryCode: string)
  {
    this._countryCode = countryCode;
  }

  public get isActive(): boolean
  {
    return this._isActive;
  }

  public set isActive(isActive: boolean)
  {
    this._isActive = isActive;
  }

  public static deserialize(jsonObject: any): User
  {
    try
    {
      const jsonConverter: JsonConvert = new JsonConvert();
      jsonConverter.ignorePrimitiveChecks = false;
      jsonConverter.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
      return jsonConverter.deserializeObject(jsonObject, User);
    }
    catch (err)
    {
      throw new Error(`Error occurred while serializing object: ${JSON.stringify(jsonObject)}`);
    }
  }

  public static deserializeArray(jsonObjectArray: any): Array<User>
  {
    try
    {
      const jsonConverter: JsonConvert = new JsonConvert();
      jsonConverter.ignorePrimitiveChecks = false;
      jsonConverter.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL;
      return jsonConverter.deserializeArray(jsonObjectArray, User);
    }
    catch(err)
    {
      throw new Error(`Error occurred while serializing array: ${JSON.stringify(jsonObjectArray)}`);
    }
  }
}
