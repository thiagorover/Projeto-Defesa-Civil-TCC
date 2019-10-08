import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { GroupsComponent } from "./groups.component";

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    data: {
      title: 'Groups',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {
}
