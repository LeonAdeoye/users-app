import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { GridOptions } from "ag-grid-community";
import { MatMenuTrigger } from "@angular/material/menu";
import { LoggingService } from "../../services/logging.service";
import { ConfigurationService } from "../../services/configuration.service";
import { GridSearchService } from "../../services/grid-search.service";
import { UsageService } from "../../services/usage.service";
import { LogLevel, ServiceUpdate } from "../../models/types";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.sass"]
})
export class UsersComponent implements OnInit, OnDestroy
{
  public usersGridOptions: GridOptions;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public contextMenuPosition = { x: "0px", y: "0px" };
  private usersServiceSubscription: Subscription;
  private gridSearchServiceSubscription: Subscription;

  constructor(private loggingService: LoggingService, private configurationService: ConfigurationService,
              private gridSearchService: GridSearchService, private usageService: UsageService, private userService: UserService)
  {
    this.usersGridOptions = {} as GridOptions;
    this.usersGridOptions.columnDefs = this.getColumnsDefinitions();
    this.usersGridOptions.getRowNodeId = (row) =>
    {
      return row.id;
    };

    this.usersGridOptions.suppressCellSelection = true;

    this.usersGridOptions.onCellContextMenu = (params) =>
    {
      if(this.trigger && this.trigger.menuOpen)
        this.trigger.closeMenu();

      const mouseEvent = params.event as MouseEvent;
      if(this.trigger && this.trigger.menuClosed && mouseEvent && mouseEvent.clientX && mouseEvent.clientY)
      {
        this.contextMenuPosition.x = `${mouseEvent.clientX}px`;
        this.contextMenuPosition.y = `${mouseEvent.clientY}px`;

        this.usersGridOptions.api.deselectAll();
        params.node.setSelected(true);
        this.trigger.openMenu();
      }
    };

    this.usersServiceSubscription = this.userService.serviceUpdateSubject.subscribe((serviceUpdate: ServiceUpdate) =>
    {
      if(serviceUpdate  === ServiceUpdate.REFRESH && this.usersGridOptions.api)
        this.refreshGrid();
    });

    this.gridSearchServiceSubscription = this.gridSearchService.gridSearchTextSubject.subscribe((gridSearchTextValue) =>
    {
      if(this.usersGridOptions.api)
        this.usersGridOptions.api.setQuickFilter(gridSearchTextValue);
    });
  }

  private log(message: string, logLevel?: LogLevel): void
  {
    this.loggingService.log("UsersComponent", message, logLevel);
  }

  public getSelectedUser(): User
  {
    if(this.usersGridOptions.api && this.usersGridOptions.api.getSelectedRows().length > 0)
      return this.usersGridOptions.api.getSelectedRows()[0] as User;

    return null;
  }

  private getColumnsDefinitions(): any[]
  {
    return [
      {
        field: "userId",
        sortable: true,
        minWidth: 100,
        width: 130
      },
      {
        field: "fullName",
        sortable: true,
        minWidth: 250,
        width: 250
      },
      {
        field: "region",
        sortable: true,
        minWidth: 100,
        width: 100
      },
      {
        field: "countryCode",
        sortable: true,
        minWidth: 130,
        width: 130
      },
      {
        field: "location",
        sortable: true,
        minWidth: 150,
        maxWidth: 150,
        width: 150
      },
      {
        field: "deskName",
        sortable: true,
        minWidth: 250,
        width: 150
      },
      {
        field: "isActive",
        minWidth: 80,
        maxWidth: 80,
        width: 80
      }
    ];
  }

  private refreshGrid()
  {
    const itemsToUpdate = [];
    const itemsToRemove = [];
    const itemsToAdd = [];

    const users = this.userService.getAllUsers();
    for(let index = 0; index < users.length; ++index)
    {
      const user = users[index];
      const userUpdateRowNode = this.usersGridOptions.api.getRowNode(user.id);

      if(userUpdateRowNode)
        itemsToUpdate.push(user);
      else
        itemsToAdd.push(user);
    }

    this.usersGridOptions.api.forEachNode((currentRow) =>
    {
      let foundMatchingRow = false;
      for(let index = 0; index < users.length; ++index)
      {
        if(currentRow.data.id === users[index].id)
        {
          foundMatchingRow = true;
          break;
        }
      }

      if(!foundMatchingRow)
        itemsToRemove.push(currentRow.data);
    });

    this.usersGridOptions.api.updateRowData({remove: itemsToRemove});
    this.usersGridOptions.api.updateRowData({update: itemsToUpdate});

    for(let index = 0; index < itemsToAdd.length; ++index)
      this.usersGridOptions.api.updateRowData({add: [itemsToAdd[index]], addIndex: index});
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
    this.usersServiceSubscription.unsubscribe();
    this.gridSearchServiceSubscription.unsubscribe();
  }

  public addUser(): void
  {
    const selectedUser: User = this.getSelectedUser();
    // TODO
    // if(selectedUser)
    //   this.configurationService.editConfigurationSubject.next(selectedUser);
  }

  public invalidateUser(): void
  {
    const selectedUser: User = this.getSelectedUser();
    if(selectedUser)
      this.userService.invalidateUser(selectedUser.userId);
  }

  public refreshUsers(): void
  {
    this.userService.loadAllUsers();
  }

  public cloneUser(): void
  {
    const selectedUser: User = this.getSelectedUser();
    // TODO
    // if(selectedUser)
    //   this.configurationService.cloneConfigurationSubject.next(selectedUser);
  }
}
