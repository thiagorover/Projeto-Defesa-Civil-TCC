import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { MarkupComponent } from "./markup.component";

const routes: Routes = [
  {
    path: '',
    component: MarkupComponent,
    data: {
      title: 'Markup',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarkupsRoutingModule {
}
