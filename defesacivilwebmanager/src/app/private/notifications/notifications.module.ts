import { NgModule } from "@angular/core";
import { NotificationsRoutingModule } from "./notifications-routing.module";
import { NotificationsComponent } from "./notifications.component";
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
	ConfirmDialog,
	ConfirmDialogModule,
	ConfirmationService
} from "primeng/primeng";
import { TableModule } from 'primeng/table';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NotificationsService } from "app/private/notifications/notifications.service";
import { UsersService } from "app/private/users/users.service";

@NgModule({
	imports: [
		NotificationsRoutingModule,
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
		TableModule,
		ConfirmDialogModule
	],
	declarations: [
		NotificationsComponent
	],
	providers: [
		NotificationsService,
		UsersService,
		ConfirmationService
	]
})
export class NotificationsModule {
}
