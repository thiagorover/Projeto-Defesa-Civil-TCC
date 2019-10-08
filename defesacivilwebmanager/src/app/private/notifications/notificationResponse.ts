import { PaginatedResponse } from "app/core/paginatedResponse";
import { Notification } from "app/private/notifications/notification";

export class NotificationResponse extends PaginatedResponse {
	public data: Array<Notification>;
}
