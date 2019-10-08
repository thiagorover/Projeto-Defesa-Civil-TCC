import { NgModule } from "@angular/core";
import { MapRoutingModule } from "./map-routing.module";
import { MapComponent } from "./map.component";
import {
	GrowlModule, GMapModule, MessagesModule, DialogModule, InputTextModule, CheckboxModule,
	ButtonModule, TooltipModule, OverlayPanelModule, MultiSelectModule, CalendarModule, SelectButtonModule
} from "primeng/primeng";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MapService } from "./map.service";
import { MarkupTypesService } from "./markup-types.service";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { RequestService } from "app/core/request.service";
import { CoreModule } from "app/core/core.module";
import { ImagesService } from "app/private/map/images.service";

@NgModule({
	imports: [
		MapRoutingModule,
		GrowlModule,
		GMapModule,
		MessagesModule,
		ButtonModule,
		DialogModule,
		TooltipModule,
		FormsModule,
		CommonModule,
		InputTextModule,
		DropdownModule,
		CheckboxModule,
		SelectButtonModule,
		CalendarModule,
		CoreModule
	],
	declarations: [
		MapComponent
	],
	providers: [MapService, MarkupTypesService, ImagesService]
})
export class MapModule {
}
