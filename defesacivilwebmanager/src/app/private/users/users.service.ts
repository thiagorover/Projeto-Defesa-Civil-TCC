import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { User } from "./user";
import { environment } from "../../../environments/environment"
import { RequestService } from "app/core/request.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class UsersService {

	private headers = new Headers({ 'Content-Type': 'application/json' });
	private usersUrl = environment.serverUrl + '/users';

	constructor(private requestService: RequestService, private toastr: ToastrService) {
	}

	getUsers(): Promise<User[]> {
		return this.requestService.get(this.usersUrl).
			then((response) => {
				let users: User[] = [];
				response.object.forEach(userResponse => {
					let user = new User();
					user.user_id = userResponse.user_id;
					user.profile_id = userResponse.profile_id;
					user.name = userResponse.name;
					user.email = userResponse.email;
					user.status = userResponse.status;
					user.receive_notification = userResponse.receive_notification === 1 ? true : false;
					user.password = response.object.password;
					users.push(user);
				});
				return users;
			});
	}

	getUser(id: number): Promise<User> {
		const path = `${this.usersUrl}/${id}`;
		return this.requestService.get(path).
			then((response) => {
				if (response.object && response.object.lenght > 0) {
					var user = new User();
					user.user_id = response.object[0].id;
					user.profile_id = response.object[0].profile_id;
					user.name = response.object[0].name;
					user.email = response.object[0].email;
					user.status = response.object[0].status;
					user.receive_notification = response.object[0].receive_notification === 1 ? true : false;
					user.password = response.object[0].password;
					return user;
				}
				return undefined;
			});
	}

	saveUser(user: User): Promise<User> {
		return this.requestService.post(`${this.usersUrl}`, JSON.stringify({
			profile: user.profile_id,
			name: user.name,
			email: user.email,
			status: 1,
			receive_notification: user.receive_notification === true ? 1 : 0,
			password: user.password
		})).then((response) => {
			this.toastr.success(response.message, 'Sucesso!');
			return response.object as User
		});
	}

	updateUser(user: User): Promise<User> {
		return this.requestService.put(`${this.usersUrl}/${user.user_id}`, JSON.stringify({
			profile: user.profile_id,
			name: user.name,
			email: user.email,
			status: 1,
			receive_notification: user.receive_notification === true ? 1 : 0,
			password: user.password
		})).then((response) => {
			this.toastr.success(response.message, 'Sucesso!');
			return response.object as User
		});
	}

	deleteUser(id: number): Promise<void> {
		return this.requestService.delete(`${this.usersUrl}/${id}`)
			.then((response) => {
				this.toastr.success(response.message, 'Sucesso!');
			})

			.catch(this.handleError);
	}

	resetPassword(email: string): Promise<void>{
		const resetPasswordUrl = `${environment.serverUrl}/password/`;
		return this.requestService.post(`${resetPasswordUrl}`, { user_email: email }).then(response => {
			this.toastr.success("Verifique seu e-mail", 'Sucesso');
		}).catch(this.handleError);
	}

	changePassword(oldPassword: string, newPassword): Promise<void>{
		const changePasswordUrl = `${environment.serverUrl}/changePassword/`;
		return this.requestService.put(`${changePasswordUrl}`, { password: oldPassword, newPassword:  newPassword}).then(response => {
			this.toastr.success("Senha alterada", 'Sucesso');
		}).catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
	
	buscaUsuariologado(email: string): Promise<void>{
		const usersUrlgetbyemail  = `${this.usersUrl}/getbymail/${email}`;

		return this.requestService.get(usersUrlgetbyemail).then((response) => {
			if (response.object && response.object.lenght > 0) {
			
			console.log(response.object[0]);
			/*	var user = new User();
				user.user_id = response.object[0].id;
				user.profile_id = response.object[0].profile_id;
				user.name = response.object[0].name;
				user.email = response.object[0].email;
				user.status = response.object[0].status;
				user.receive_notification = response.object[0].receive_notification === 1 ? true : false;
				user.password = response.object[0].password;
				return user;*/
			}
			return undefined;
		});
	}
}
