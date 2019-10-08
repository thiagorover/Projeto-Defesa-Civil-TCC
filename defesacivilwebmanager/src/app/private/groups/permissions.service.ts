import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Permission } from "./permission";
import { environment } from "../../../environments/environment"

import "rxjs/add/operator/toPromise";
import { RequestService } from "app/core/request.service";


@Injectable()
export class PermissionsService {

	private groupURL = `${environment.serverUrl}/permissions`;
	private groupPermissionURL = `${environment.serverUrl}/profilepermissions`;
	constructor(private http: Http, private requestService: RequestService) {
	}

	getPermissions(): Promise<Permission[]> {
		return this.requestService.get(this.groupURL)
			.then(response => {
				let permissions: Permission[] = this.getPermissionsUnChecked(response);
				return permissions;
			});
	}

	getPermissionsByGroupId(groupId: number): Promise<Permission[]> {
		return this.requestService.get(`${this.groupPermissionURL}/${groupId}`)
			.then(response => {
				let permissions: Permission[] = [];
				if (response && response.length > 0) {
					response.json().object.forEach(permission => {
						permissions.push({
							id: permission.idpermission
						});
					});
				}
				return permissions;
			});
	}

	private getPermissionsUnChecked(response: any): Permission[] {
		if (response.object && response.object.length > 0) {
			let permissions = response.object as Permission[];
			return permissions = permissions.filter((permission: Permission) => {
				permission.checked = false;
				return permission;
			});
		} else {
			return [];
		}
	}
}
