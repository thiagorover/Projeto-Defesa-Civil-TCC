import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from 'app/guards/auth.guard';
import { AuthChildrenGuard } from 'app/guards/auth-children.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthGuard, AuthChildrenGuard]
})
export class GuardsModule { }
