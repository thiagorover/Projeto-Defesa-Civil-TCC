import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router/";
import {TabsModule} from "ng2-bootstrap/tabs";

import {NAV_DROPDOWN_DIRECTIVES} from "../shared/nav-dropdown.directive";
import {SIDEBAR_TOGGLE_DIRECTIVES} from "../shared/sidebar.directive";
import {AsideToggleDirective} from "../shared/aside.directive";

import {
	GrowlModule,
	GMapModule,
	MessagesModule,
	DialogModule,
	InputTextModule,
	CheckboxModule,
	ButtonModule, TooltipModule
} from "primeng/primeng";
import {FullLayoutComponent} from "./full-layout.component";
import {SimpleLayoutComponent} from "./simple-layout.component";
import { CoreModule } from "app/core/core.module";
import { AuthService } from "app/public/login/auth.service";
import { FormsModule } from "@angular/forms";
import { UsersService } from "app/private/users/users.service";

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		TabsModule,
		GrowlModule,
		GMapModule,
		MessagesModule,
		DialogModule,
		InputTextModule,
		CheckboxModule,
		ButtonModule,
		CoreModule,
		FormsModule
	],
	declarations: [
		FullLayoutComponent,
		SimpleLayoutComponent,
		NAV_DROPDOWN_DIRECTIVES,
		SIDEBAR_TOGGLE_DIRECTIVES,
		AsideToggleDirective

	],
	providers: [AuthService, UsersService]
})
export class LayoutModule {
}
