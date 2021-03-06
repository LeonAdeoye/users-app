import { BrowserModule } from "@angular/platform-browser";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MainHeaderComponent } from "./components/main-header/main-header.component";
import { AgGridModule } from "ag-grid-angular";
import { LoggingService } from "./services/logging.service";
import { MessageService } from "./services/message.service";
import { ConfigurationService } from "./services/configuration.service";
import { BootstrapService } from "./services/bootstrap.service";
import { PopupService } from "./services/popup.service";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material.module";
import { FormsModule } from "@angular/forms";
import { DetailComponent } from "./components/detail/detail.component";
import { UsersComponent } from "./components/users/users.component";
import { UsageComponent } from "./components/usage/usage.component";
import { DeskUsageComponent } from "./components/desk-usage/desk-usage.component";
import { PopupComponent } from "./components/popup/popup.component";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  schemas:
  [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    MainHeaderComponent,
    DetailComponent,
    UsersComponent,
    UsageComponent,
    PopupComponent,
    DeskUsageComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([
      DeskUsageComponent
    ]),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [
    LoggingService,
    MessageService,
    ConfigurationService,
    BootstrapService,
    PopupService
  ],
  entryComponents:
  [
    PopupComponent,
    DeskUsageComponent
  ],
  bootstrap:
  [
    AppComponent
  ]
})

export class AppModule { }
