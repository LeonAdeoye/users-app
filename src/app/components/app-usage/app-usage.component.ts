import { Component } from "@angular/core";
import { IAfterGuiAttachedParams, ICellRendererComp } from "ag-grid-community";


@Component({
  selector: "app-app-usage",
  templateUrl: "./app-usage.component.html",
  styleUrls: ["./app-usage.component.sass"]
})
export class AppUsageComponent implements ICellRendererComp
{

  constructor() { }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void
  {
  }

  destroy(): void
  {
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
