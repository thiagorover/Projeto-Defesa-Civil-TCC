import { NgModule } from "@angular/core";
import { GroupsRoutingModule } from "./groups-routing.module";
import { GroupsComponent } from "./groups.component";
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
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { GroupsService } from "app/private/groups/groups.service";
import { PermissionsService } from "app/private/groups/permissions.service";
import { CoreModule } from "app/core/core.module";
import { ConfirmationService } from "primeng/components/common/confirmationservice";

@NgModule({
	imports: [
		GroupsRoutingModule,
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
		TooltipModule,
		CalendarModule,
		CoreModule,
		ConfirmDialogModule
	],
	declarations: [
		GroupsComponent
	],
	providers: [GroupsService, PermissionsService, ConfirmationService]
})
export class GroupsModule {
}
