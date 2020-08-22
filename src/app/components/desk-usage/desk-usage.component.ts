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
  public deskDrilldown: string;
  public deskUsageGridOptions: GridOptions;
  public title;
  public answerSubject: Subject<Answer>;

  constructor(private usageService: UsageService, private userService: UserService, private modalReference: BsModalRef)
  {
    this.deskUsageGridOptions = {} as GridOptions;
    this.deskUsageGridOptions.columnDefs = this.getColumnsDefinitions();
    this.deskUsageGridOptions.getRowNodeId = (row) =>
    {
      return row.id;
    };
  }

  public getColumnsDefinitions(): any[]
  {
    const columns = [
      {
        headerName: "user",
        field: "user",
        sortable: true,
        minWidth: 130,
        width: 130
      }
    ];

    const apps = this.usageService.getUsageApps();

    for(const app of apps)
    {
      columns.push(
        {
          headerName: app,
          field: app,
          sortable: true,
          minWidth: 160,
          width: 160
        });
    }

    return columns;
  }

  private refreshGrid()
  {
    const allUsageList = this.usageService.getAllUsage();
    const mapOfUsers = new Map<string, any>();

    for (const currentUsage of allUsageList)
    {
      if(this.userService.getUsersDeskName(currentUsage.user) === this.deskDrilldown)
      {
        if(mapOfUsers.has(currentUsage.user))
        {
          const user = mapOfUsers.get(currentUsage.user);
          user[currentUsage.app] = currentUsage.monthlyCount[new Date().getMonth()];
        }
        else
        {
          const user = {user: currentUsage.user};
          user[currentUsage.app] = currentUsage.monthlyCount[new Date().getMonth()];
          mapOfUsers.set(currentUsage.user, user);
        }
      }
    }

    let index = 0;
    for(const [, value] of mapOfUsers)
      this.deskUsageGridOptions.api.updateRowData({add: [value], addIndex: index++});
  }

  public onGridReady(param): void
  {
    this.deskUsageGridOptions.api = param.api;
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
