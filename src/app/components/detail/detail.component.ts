import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UtilityService } from "../../services/utility.service";
import { LoggingService } from "../../services/logging.service";
import { LogLevel } from "../../models/types";
import { UsageService } from "../../services/usage.service";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-user-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.sass"]
})
export class DetailComponent implements OnInit
{
  @Input() user: User;
  @Output() closePanelEventEmitter = new EventEmitter();

  constructor(private loggingService: LoggingService, private usageService: UsageService, private userService: UserService)
  {
    this.clear();
  }

  private log(message: string, logLevel?: LogLevel): void
  {
    this.loggingService.log("DetailComponent", message, logLevel);
  }

  ngOnInit(): void
  {
  }

  public clear(): void
  {
    this.user = new User();
  }

  public save(): void
  {
    this.userService.saveUser(this.user);
    this.usageService.saveUsage("saved user");
    this.closePanelEventEmitter.emit();
  }

  public cancel(): void
  {

    this.closePanelEventEmitter.emit();
  }

  public canClear(): boolean
  {
    return UtilityService.isNotNullOrEmptyOrBlankOrUndefined(this.user.fullName)
      || UtilityService.isNotNullOrEmptyOrBlankOrUndefined(this.user.deskName)
      || UtilityService.isNotNullOrEmptyOrBlankOrUndefined(this.user.userId);
    // TODO
  }

  public canSave(): boolean
  {
    return UtilityService.isNotNullOrEmptyOrBlankOrUndefined(this.user.fullName)
      && UtilityService.isNotNullOrEmptyOrBlankOrUndefined(this.user.deskName)
      && UtilityService.isNotNullOrEmptyOrBlankOrUndefined(this.user.userId);
    // TODO
  }
}
