import { Component } from "@angular/core";
import { IAfterGuiAttachedParams, ICellRendererComp } from "ag-grid-community";
import { UsageService } from "../../services/usage.service";


@Component({
  selector: "app-desk-usage",
  templateUrl: "./desk-usage.component.html",
  styleUrls: ["./desk-usage.component.sass"]
})
export class DeskUsageComponent implements ICellRendererComp
{
  private deskDrilldown: string;

  constructor(private usageService: UsageService)
  {
    this.usageService.deskDrilldownSubject.subscribe((deskDrilldown) =>
    {
      this.deskDrilldown = deskDrilldown;
    });
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void
  {
  }

  destroy(): void
  {
    this.usageService.deskDrilldownSubject.unsubscribe();
  }

  getGui(): HTMLElement
  {
    return undefined;
  }

  refresh(params: any): boolean
  {
    return false;
  }

}
