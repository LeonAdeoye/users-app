import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { MatMenuTrigger } from "@angular/material/menu";
import { LoggingService } from "../../services/logging.service";
import { ConfigurationService } from "../../services/configuration.service";
import { GridSearchService } from "../../services/grid-search.service";
import { UsageService } from "../../services/usage.service";
import { LogLevel, ServiceUpdate } from "../../models/types";
import { Usage } from "../../models/usage";
import { Subscription } from "rxjs";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-usage",
  templateUrl: "./usage.component.html",
  styleUrls: ["./usage.component.sass"]
})
export class UsageComponent implements OnInit, OnDestroy
{
  public usageGridOptions: GridOptions;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public contextMenuPosition = { x: "0px", y: "0px" };
  private usageServiceSubscription: Subscription;
  private gridSearchServiceSubscription: Subscription;

  constructor(private loggingService: LoggingService, private configurationService: ConfigurationService,
              private gridSearchService: GridSearchService, private usageService: UsageService, private userService: UserService)
  {
    this.usageGridOptions = {} as GridOptions;
    this.usageGridOptions.columnDefs = this.getColumnsDefinitions(usageService.getUsageApps());
    this.usageGridOptions.getRowNodeId = (row) =>
    {
      return row.id;
    };

    this.usageGridOptions.suppressCellSelection = true;

    this.usageGridOptions.onCellContextMenu = (params) =>
    {
      if(this.trigger && this.trigger.menuOpen)
        this.trigger.closeMenu();

      const mouseEvent = params.event as MouseEvent;
      if(this.trigger && this.trigger.menuClosed && mouseEvent && mouseEvent.clientX && mouseEvent.clientY)
      {
        this.contextMenuPosition.x = `${mouseEvent.clientX}px`;
        this.contextMenuPosition.y = `${mouseEvent.clientY}px`;

        this.usageGridOptions.api.deselectAll();
        params.node.setSelected(true);
        this.trigger.openMenu();
      }
    };

    this.usageServiceSubscription = this.usageService.serviceUpdateSubject.subscribe((serviceUpdate: ServiceUpdate) =>
    {
      if(serviceUpdate  === ServiceUpdate.REFRESH && this.usageGridOptions.api)
      {
        this.refreshGrid();
      }
    });

    this.gridSearchServiceSubscription = this.gridSearchService.gridSearchTextSubject.subscribe((gridSearchTextValue) =>
    {
      if(this.usageGridOptions.api)
        this.usageGridOptions.api.setQuickFilter(gridSearchTextValue);
    });
  }

  private log(message: string, logLevel?: LogLevel): void
  {
    this.loggingService.log("UsageComponent", message, logLevel);
  }

  public getSelectedUsage(): Usage
  {
    if(this.usageGridOptions.api && this.usageGridOptions.api.getSelectedRows().length > 0)
      return this.usageGridOptions.api.getSelectedRows()[0] as Usage;

    return null;
  }

  private getColumnsDefinitions(apps: Array<string>): any[]
  {
    const columns = [
      {
        headerName: "deskName",
        valueGetter: (params) => params.data.deskName,
        sortable: true,
        minWidth: 200,
        width: 250
      }
    ];

    for(let index = 0; index < apps.length; ++index)
      columns.push(
        {
          headerName: apps[index],
          valueGetter: (params) => this.getUsage(apps[index], params.data.deskName),
          sortable: true,
          minWidth: 150,
          width: 150
        });

    return columns;
  }

  public getUsage(appName: string, deskName: string): number
  {
    const usageLength = this.usageService.getAllUsage().length;
    for(let usageIndex = 0; usageIndex < usageLength; ++usageIndex)
    {
      const usage = this.usageService.getAllUsage()[usageIndex];
      const userLength = this.userService.getAllUsers().length;
      if(usage.app === appName)
      {
        let count = 0; let total = 0;
        for(let userIndex = 0; userIndex < userLength; ++userIndex)
        {
            const user = this.userService.getAllUsers()[userIndex];
            if(user.userId === usage.user  && user.deskName === deskName)
            {
              ++count;
              total = total + usage.monthlyCount.reduce((a, b) => a + b, 0);
            }
        }
        return total/count;
      }
    }
    return 0;
  }

  private refreshGrid()
  {
    const itemsToUpdate = [];
    const itemsToRemove = [];
    const itemsToAdd = [];

    const deskList = this.userService.getUniqueDesks();
    for(let index = 0; index < deskList.length; ++index)
    {
      const desk = deskList[index];
      const usageUpdateRowNode = this.usageGridOptions.api.getRowNode(desk.deskName);

      if(usageUpdateRowNode)
        itemsToUpdate.push(desk);
      else
        itemsToAdd.push(desk);
    }

    this.usageGridOptions.api.forEachNode((currentRow) =>
    {
      let foundMatchingRow = false;
      for(let index = 0; index < deskList.length; ++index)
      {
        if(currentRow.data.deskName === deskList[index].deskName)
        {
          foundMatchingRow = true;
          break;
        }
      }

      if(!foundMatchingRow)
        itemsToRemove.push(currentRow.data);
    });

    this.usageGridOptions.api.updateRowData({remove: itemsToRemove});
    this.usageGridOptions.api.updateRowData({update: itemsToUpdate});

    for(let index = 0; index < itemsToAdd.length; ++index)
      this.usageGridOptions.api.updateRowData({add: [itemsToAdd[index]], addIndex: index});
  }

  public onGridReady(event): void
  {
    this.refreshGrid();
  }

  ngOnInit(): void
  {
  }

  ngOnDestroy(): void
  {
    this.log("Performing unsubscribe on existing subscriptions in the onDestroy hook method.", LogLevel.DEBUG);
    this.usageServiceSubscription.unsubscribe();
    this.gridSearchServiceSubscription.unsubscribe();
  }

  public refreshUsage(): void
  {
    this.usageService.loadAllUsage();
  }
}
