import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { AuthGuard } from "app/guards/auth.guard";
import { AuthChildrenGuard } from "app/guards/auth-children.guard";

const routes: Routes = [
  {
	path: '',
    data: {
		title: 'Private'
	},
    children: [
      {
        path: 'map',
        loadChildren: './map/map.module#MapModule'
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
      },
      {
        path: 'groups',
        loadChildren: './groups/groups.module#GroupsModule'
      },
      {
        path: 'markups',
        loadChildren: './markups/markups.module#MarkupsModule'
      },
      {
        path: 'notifications',
        loadChildren: './notifications/notifications.module#NotificationsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule {
}
