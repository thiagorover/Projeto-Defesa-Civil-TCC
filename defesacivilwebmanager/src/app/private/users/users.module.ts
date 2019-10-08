import {NgModule} from "@angular/core";
import {UsersRoutingModule} from "./users-routing.module";
import {UsersComponent} from "./users.component";
import {
  ButtonModule,
  CheckboxModule,
  DialogModule,
  GrowlModule,
  InputTextModule,
  MessagesModule,
  DataTableModule,
  SharedModule,
  CalendarModule,
  InputSwitchModule,
  TooltipModule,
  DropdownModule,
  ConfirmDialogModule
} from "primeng/primeng";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpModule, JsonpModule} from "@angular/http";
import {UsersService} from "./users.service";
import { GroupsService } from "app/private/groups/groups.service";
import {InputTextareaModule} from "primeng/components/inputtextarea/inputtextarea";
import { CoreModule } from "app/core/core.module";
import { ConfirmationService } from "primeng/components/common/confirmationservice";

@NgModule({
  imports: [
    UsersRoutingModule,
    GrowlModule,
    MessagesModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    CheckboxModule,
    DataTableModule,
    SharedModule,
    DropdownModule,
    InputSwitchModule,
    InputTextareaModule,
    TooltipModule,
    CalendarModule,
    HttpModule,
	JsonpModule,
	CoreModule,
	ConfirmDialogModule
  ],
  providers: [
    UsersService,
	GroupsService,
	ConfirmationService
  ],
  declarations: [
    UsersComponent
  ]
})
export class UsersModule {
}
