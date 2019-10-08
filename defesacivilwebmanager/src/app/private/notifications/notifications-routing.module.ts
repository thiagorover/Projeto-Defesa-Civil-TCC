import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { NotificationsComponent} from "./notifications.component";

const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
    data: {
      title: 'Markup',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {
}
