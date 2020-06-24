import { Component, OnDestroy, OnInit } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { UsageService } from "../../services/usage.service";

@Component({
  selector: "app-desk-usage",
  templateUrl: "./desk-usage.component.html",
  styleUrls: ["./desk-usage.component.sass"]
})
export class DeskUsageComponent implements OnInit, OnDestroy
{
  private deskDrilldown: string;
  public deskUsageGridOptions: GridOptions;
  public title;


  constructor(private usageService: UsageService)
  {
    this.deskUsageGridOptions = {} as GridOptions;
    this.deskUsageGridOptions.columnDefs = this.getColumnsDefinitions();
    this.usageService.deskDrilldownSubject.subscribe((deskDrilldown) =>
    {
      this.deskDrilldown = deskDrilldown;
    });
  }

  public getColumnsDefinitions(): any[]
  {
    // TODO get the list of apps
    const columns = [
      {
        headerName: "configuration-app",
        valueGetter: (params) => params.data.deskName,
        sortable: true,
        minWidth: 200,
        width: 200
      }
    ];

    return columns;
  }

  private refreshGrid()
  {
    const itemsToUpdate = [];
    const itemsToRemove = [];
    const itemsToAdd = [];

    // TODO

    this.deskUsageGridOptions.api.updateRowData({remove: itemsToRemove});
    this.deskUsageGridOptions.api.updateRowData({update: itemsToUpdate});

    for (let index = 0; index < itemsToAdd.length; ++index)
      this.deskUsageGridOptions.api.updateRowData({add: [itemsToAdd[index]], addIndex: index});
  }

  public onGridReady(event): void
  {
    this.refreshGrid();
  }

  ngOnDestroy(): void
  {
  }

  ngOnInit(): void
  {
  }
}
