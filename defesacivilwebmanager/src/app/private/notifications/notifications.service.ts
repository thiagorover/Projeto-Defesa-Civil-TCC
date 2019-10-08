import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Notification } from "./notification";
import { environment } from "../../../environments/environment"
import { RequestService } from "app/core/request.service";
import { ToastrService } from "ngx-toastr";
import { NotificationResponse } from "app/private/notifications/notificationResponse";

@Injectable()
export class NotificationsService {

	private notificationsUrl = environment.serverUrl + '/notifications';

	constructor(private requestService: RequestService, private toastr: ToastrService) { }

	public getNotifications(pageNumber: number): Promise<NotificationResponse> {
		return this.requestService.get(`${this.notificationsUrl}?page=${pageNumber}&max=15`)
			.then((response) => {
				return response.object as NotificationResponse;
			})
			.catch(this.handleError);
	}

	public saveUser(notification: Notification): Promise<Notification> {
		return this.requestService.post(`${this.notificationsUrl}`, JSON.stringify(notification))
			.then((response) => {
				this.toastr.success(response.message, "Sucesso");
				response.object as Notification
			})
			.catch(this.handleError);
	}

	public deleteNotification(notificationId: number): Promise<void> {
		return this.requestService.delete(`${this.notificationsUrl}/${notificationId}`).then(()=>{

		}).catch(error =>{
			this.handleError(error);
		});
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}
