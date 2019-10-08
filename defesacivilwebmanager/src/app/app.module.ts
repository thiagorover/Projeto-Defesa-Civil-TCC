import { NgModule, LOCALE_ID, OnDestroy } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { CommonModule, HashLocationStrategy, LocationStrategy } from "@angular/common";
import { AppRoutingModule } from "./app.routing";
import { TabsModule } from "ng2-bootstrap/tabs";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";
import { LayoutModule } from "app/layout/layout.module";
import { GuardsModule } from "app/guards/guards.module";
import { ToastrModule } from 'ngx-toastr';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClientModule } from '@angular/common/http';
// the second parameter 'fr' is optional
registerLocaleData(localePt, 'pt');

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		AppRoutingModule,
		FormsModule,
		TabsModule.forRoot(),
		ChartsModule,
		HttpModule,
		LayoutModule,
		JsonpModule,
		GuardsModule,
		ToastrModule.forRoot(),
		HttpClientModule
	],
	declarations: [
		AppComponent
	],
	providers: [
		{
			provide: LocationStrategy,
			useClass: HashLocationStrategy,

		},
		{ provide: LOCALE_ID, useValue: "pt" }],
	bootstrap: [AppComponent]
})
export class AppModule {
}
