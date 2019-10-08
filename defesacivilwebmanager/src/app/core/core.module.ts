import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from 'app/core/request.service';
import { MessageModule } from 'primeng/primeng';

@NgModule({
  imports: [
	CommonModule,
	MessageModule
  ],
  providers: [
	  RequestService
  ]
})
export class CoreModule { }
