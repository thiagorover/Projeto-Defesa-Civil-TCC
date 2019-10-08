import { NgModule } from "@angular/core";
import { MarkupsRoutingModule } from "./markups-routing.module";
import { MarkupComponent } from "./markup.component";
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
import { UsersService } from "app/private/users/users.service";
import { MapService } from "app/private/map/map.service";
import { CoreModule } from "app/core/core.module";
import { ConfirmationService } from "primeng/components/common/confirmationservice";

@NgModule({
	imports: [
		MarkupsRoutingModule,
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
		MarkupComponent
	],
	providers: [
		UsersService,
		MapService,
		ConfirmationService
	]
})
export class MarkupsModule {
}
