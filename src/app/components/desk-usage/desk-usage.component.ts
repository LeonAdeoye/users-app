import { Component, OnDestroy, OnInit } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { UsageService } from "../../services/usage.service";
import { UserService } from "../../services/user.service";
import { Answer } from "../../models/types";
import { Subject } from "rxjs";
import { BsModalRef } from "ngx-bootstrap/modal";

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
  public answerSubject: Subject<Answer>;

  constructor(private usageService: UsageService, private userService: UserService, private modalReference: BsModalRef)
  {
    this.deskUsageGridOptions = {} as GridOptions;
    this.deskUsageGridOptions.columnDefs = this.getColumnsDefinitions();
    this.usageService.deskDrilldownSubject.subscribe((deskDrilldown) =>
    {
      // TODO
      this.deskDrilldown = deskDrilldown;
      this.refreshGrid();
    });
  }

  public getColumnsDefinitions(): any[]
  {
    const columns = [
      {
        headerName: "user",
        sortable: true,
        minWidth: 130,
        width: 130
      }
    ];

    const apps = this.usageService.getUsageApps();

    for(let index = 0; index < apps.length; ++index)
      columns.push(
      {
        headerName: apps[index],
        sortable: true,
        minWidth: 160,
        width: 160
      });

    return columns;
  }

  private refreshGrid()
  {
    const itemsToUpdate = [];
    const itemsToRemove = [];
    const itemsToAdd = [];

    const allUsageList = this.usageService.getAllUsage();
    for (let index = 0; index < allUsageList.length; ++index)
    {
      const currentUsage = allUsageList[index];
      if(this.userService.getUsersDeskName(currentUsage.user) === this.deskDrilldown)
      {
        const usageUpdateRowNode = this.deskUsageGridOptions.api.getRowNode(currentUsage.id);

        if (usageUpdateRowNode)
          itemsToUpdate.push(currentUsage);
        else
          itemsToAdd.push(currentUsage);
      }
    }

    // this.deskUsageGridOptions.api.forEachNode((currentRow) =>
    // {
    //   let foundMatchingRow = false;
    //   for (let index = 0; index < allUsageList.length; ++index)
    //   {
    //     if (currentRow.data.deskName === allUsageList[index].deskName)
    //     {
    //       foundMatchingRow = true;
    //       break;
    //     }
    //   }
    //
    //   if (!foundMatchingRow)
    //     itemsToRemove.push(currentRow.data);
    // });

    this.deskUsageGridOptions.api.updateRowData({remove: itemsToRemove});
    this.deskUsageGridOptions.api.updateRowData({update: itemsToUpdate});

    for (let index = 0; index < itemsToAdd.length; ++index)
      this.deskUsageGridOptions.api.updateRowData({add: [itemsToAdd[index]], addIndex: index});
  }

  public onGridReady(event): void
  {
    if(this.deskDrilldown)
      this.refreshGrid();
  }

  public ngOnDestroy(): void
  {
  }

  public ngOnInit(): void
  {
  }

  public close(): void
  {
    this.answerSubject.next(Answer.OK);
    this.modalReference.hide();
  }
}
