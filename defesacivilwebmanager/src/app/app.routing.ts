import { RouterModule, Routes } from "@angular/router";
import { SimpleLayoutComponent } from "./layout/simple-layout.component";
import { NgModule } from "@angular/core";
import { FullLayoutComponent } from "./layout/full-layout.component";
import { AuthChildrenGuard } from "app/guards/auth-children.guard";
import { AuthGuard } from "app/guards/auth.guard";

export const routes: Routes = [
	{ path: 'private', redirectTo: 'private/mapa', pathMatch: 'full', canActivate: [AuthGuard] },
	{ path: '', redirectTo: 'private/mapa', pathMatch: 'full', canActivate: [AuthGuard] },
	{ path: 'login', component: SimpleLayoutComponent, data: {title: 'Public'
		},
		children: [
			{
				path: '',
				loadChildren: './public/login/login.module#LoginModule',
			}
		]
	},
	{ path: 'private',component: FullLayoutComponent,data: {title: 'Private'},
	  canActivate: [AuthGuard],
		children: [
		
			{
				path: '',
				loadChildren: './private/private.module#PrivateModule',
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
