import { Component } from "@angular/core";
import { IAfterGuiAttachedParams, ICellRendererComp } from "ag-grid-community";


@Component({
  selector: "desk-usage",
  templateUrl: "./desk-usage.component.html",
  styleUrls: ["./desk-usage.component.sass"]
})
export class DeskUsageComponent implements ICellRendererComp
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
