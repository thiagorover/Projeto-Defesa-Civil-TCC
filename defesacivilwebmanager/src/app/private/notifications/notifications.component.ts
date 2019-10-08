import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NotificationsService } from "app/private/notifications/notifications.service";
import { Notification } from "./notification"
import { NotificationView } from "app/private/notifications/notificationView";
import { UsersService } from "app/private/users/users.service";
import { NotificationResponse } from "app/private/notifications/notificationResponse";
import { DataTable } from "primeng/primeng";
import { Table } from "primeng/table";
import { LazyLoadEvent } from "primeng/components/common/api";
import { ConfirmationService } from "primeng/components/common/confirmationservice";


@Component({
	templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
	public notifications: NotificationResponse;

	public display: boolean = false;
	public first: number = 0;

	public notification: Notification = new Notification();
	public notificationView = [];

	public columns: any = [
		{ field: 'description', header: 'Descrição' },
		{ field: 'detail', header: 'Detalhe' },
		{ field: 'created_at', header: 'Criado em', isDate: true }
	];

	constructor(private notificationsService: NotificationsService, private usersService: UsersService,
		private confirmationService: ConfirmationService) { }

	ngOnInit() {
		this.loadData();
	}

	addNotification() {
		this.notificationsService.saveUser(this.notification).then((notification) => {
			this.closeDialog();
			this.notification = new Notification();
			this.loadData();
			const firstPageElement: any = document.querySelector(".ui-paginator-page");
			firstPageElement.click();
		});

	}

	private loadData(pageNumber: number = 1): void {
		this.notificationsService.getNotifications(pageNumber).then(notifications => {
			this.notifications = notifications;
		});
	}

	public loadNotificationLazy(event: LazyLoadEvent) {
		const pageNumber = (event.first + event.rows) / event.rows;
		this.loadData(pageNumber);
	}

	showDialog() {
		this.display = true;
	}

	closeDialog() {
		this.notification = new Notification();
		this.display = false;
	}

	deleteNotification(notificationId: number) {
		const pageSelectElement: Element = document.querySelector(".ui-state-active");
		this.confirmationService.confirm({
			message: 'Tem certeza que deseja excluir esse registro?',
			header: 'Excluir',
			icon: 'fa fa-question-circle',
			accept: () => {
				this.notificationsService.deleteNotification(notificationId).then(() => {
					+pageSelectElement.innerHTML;
					let pageSelect: number = this.notifications.data.length === 1 ? +pageSelectElement.innerHTML - 1 : +pageSelectElement.innerHTML;
					pageSelect = pageSelect === 0 ? 1 : pageSelect;
					this.loadData(pageSelect);
				});
			}
		});
	}
}
