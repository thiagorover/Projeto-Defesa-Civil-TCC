import { Component, OnInit, ElementRef } from "@angular/core";
import { SelectItem } from "primeng/primeng";
import { UsersService } from "./users.service";
import { GroupsService } from "../groups/groups.service";
import { User } from "./user";
import { Group } from "app/private/groups/group";
import { ConfirmationService } from "primeng/components/common/confirmationservice";
import { ViewChild } from "@angular/core";

@Component({
	templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
	@ViewChild("userForm") userForm: HTMLFormElement;
	user: User = new User();
	passwordConfirmModel: string = "";
	users: User[] = [];
	groups: SelectItem[] = [{ label: "Selecione um grupo", value: null }];
	display: boolean = false;

	constructor(private usersService: UsersService, private groupsService: GroupsService,
		private confirmationService: ConfirmationService) { }

	ngOnInit() {

		this.getUsers();
		this.groupsService.getGroups().then(groups => {
			groups.forEach((group) => {
				this.groups.push({ label: group.description, value: group.id });
			});
		});
	}

	addUser(): void {
		this.usersService.saveUser(this.user).then(user => {
			this.userForm.reset();
			this.user = new User();
			this.display = false;
			this.getUsers();
		});
	}

	getUsers(): void {
		this.usersService.getUsers().then(users => {
			this.users = users;
		});
	}

	updateUser(user: User): void {
		this.usersService.updateUser(user).then(user => {
			this.display = false;
			this.getUsers();
		});
	}

	openUpdateUser(userCode: Number): void {
		this.display = true;
		this.user = { ...this.getUserById(userCode) };
		let group = this.getGroupById(this.user.profile_id);
		this.user.profile_id = group.value;
	}

	getUserById(userId: Number) {
		for (let user of this.users) {
			if (user.user_id == userId) {
				return user;
			}
		}
		return null;
	}

	getGroupById(groupId: Number) {
		for (let group of this.groups) {
			if (group.value == groupId) {
				return group;
			}
		}
		return null;
	}

	deleteUser(id: number): void {
		this.confirmationService.confirm({
			message: 'Tem certeza que deseja excluir esse registro?',
			header: 'Excluir',
			icon: 'fa fa-question-circle',
			accept: () => {
				this.usersService.deleteUser(id).then(res => {
					this.getUsers();
				});
			}
		});
	}

	showDialog() {
		this.user = new User();
		this.user.receive_notification = true;
		this.display = true;
	}

	closeDialog() {
		this.userForm.reset();
		this.user = new User();
	}

	hideMessage(field: any): boolean {
		return (field.disabled || field.valid || field.pristine);
	}



}
