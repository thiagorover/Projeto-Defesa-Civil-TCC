import {NgModule} from "@angular/core";
import {PrivateRoutingModule} from "./private-routing.module";
import { GuardsModule } from "app/guards/guards.module";

@NgModule({
  imports: [
	PrivateRoutingModule,
	GuardsModule
  ],
  declarations: []
})
export class PrivateModule { }
