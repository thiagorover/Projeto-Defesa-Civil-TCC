import { Group } from 'app/private/groups/group';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { environment } from "../../../environments/environment"
import { Permission } from "app/private/groups/permission";
import { RequestService } from "app/core/request.service";
import { ToastrService } from "ngx-toastr";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jsonpCallbackContext } from '../../../../node_modules/@angular/common/http/src/module';
import { error } from 'util';
import { map } from '../../../../node_modules/rxjs/operator/map';
import {RequestOptions, Headers} from '@angular/http';


@Injectable(	)
export class GroupsService {

	private token = localStorage.getItem('Authorization')
	private options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':  this.token})};
	private groupURL = environment.serverUrl + '/profiles';
	private groupPermissionURL = environment.serverUrl + '/profilepermissions';

	constructor(private requestService: RequestService, private toastr: ToastrService, private http: HttpClient) {
	}

	getGroups(): Promise<Group[]> {
		return this.requestService.get(this.groupURL)
			.then((response) => {
				return response.object as Group[];
			});
	}

	saveGroup(group: Group) {

		console.log(this.token);
		console.log(group);

		return this.http.post(this.groupURL, group, this.options);

		/**
		 * 		return this.requestService.post(this.groupURL, JSON.stringify({
				description: group.description,
				permissions: group.permissions
			})).then((response) => {
				this.toastr.success(response.message, 'Sucesso!');
				let savedGroup = response.object as Group;
				savedGroup.description = savedGroup.description;
				return savedGroup;
		});
		 * 
		 * */
	}

	updateGroup(group: Group, permissionsId): Promise<Group> {
		return this.requestService.put(`${this.groupURL}/${group.id}`, JSON.stringify({
			description: group.description,
			permissions: permissionsId
		})).then((response) => {
			this.toastr.success(response.message, 'Sucesso!');
			let savedGroup = response.object as Group;
			savedGroup.description = savedGroup.description;
			return savedGroup;
		});
	}

	deleteGroup(id: number): Promise<void> {
		return this.requestService.delete(`${this.groupURL}/${id}`)
			.then(response => {
				this.toastr.success(response.message, 'Sucesso!');
			})
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}
