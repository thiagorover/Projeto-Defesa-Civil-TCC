import { NgModule } from "@angular/core";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { FormsModule } from "@angular/forms";
import { AuthService } from "app/public/login/auth.service";
import { CommonModule } from "@angular/common";
import { MessageModule, DialogModule } from "primeng/primeng";
import { UsersService } from "app/private/users/users.service";

@NgModule({
	imports: [
		CommonModule,
		LoginRoutingModule,
		FormsModule,
		MessageModule,
		DialogModule
	],
	declarations: [
		LoginComponent
	],
	providers: [AuthService, UsersService]
})
export class LoginModule { }
