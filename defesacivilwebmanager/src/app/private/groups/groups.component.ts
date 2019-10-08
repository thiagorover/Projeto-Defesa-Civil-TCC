import { Component, OnInit, ViewChild } from "@angular/core";
import { Group } from "./group";
import { GroupsService } from "./groups.service";
import { PermissionsService } from "./permissions.service";
import { Permission } from "app/private/groups/permission";
import { ConfirmationService } from "primeng/primeng";
@Component({
	templateUrl: './groups.component.html'
})
export class GroupsComponent implements OnInit {
	@ViewChild("groupForm") groupForm: HTMLFormElement;
	group: Group = new Group();
	groups: Group[] = [];
	permissions: Permission[] = [];

	display: boolean = false;
	checked: boolean = false;
	selectedGroup: string;

	constructor(private groupsService: GroupsService, private permissionsService: PermissionsService,
		private confirmationService: ConfirmationService) {
	}

	ngOnInit() {
		this.getGroups();
		this.permissionsService.getPermissions().then(permissions => {
			this.permissions = permissions;
		});
	}

	addGroup(): void {
		this.group.permissions = this.group.permissions.filter((permission) => {
			permission.checked = undefined;
		});
		this.groupsService.saveGroup(this.group).subscribe( res =>{
			alert("Deu liga vei");
		});
		
		/**
		 * this.groupsService.saveGroup(this.group).then(group => {
			this.groupForm.reset();
			this.group = new Group();
			this.display = false;
			this.getGroups();
		});
		 */
	}

	updateGroup(group: Group): void {
		let permissionsId = [];
		group.permissions.forEach(permission => {
			permissionsId.push(permission.id);
		});
		this.groupsService.updateGroup(group, permissionsId).then(group => {
			this.display = false;
			this.getGroups();
		});

	}

	updatePermissionGroup(updatedPermission: Permission, checked: boolean): void {
		if (checked) {
			this.group.permissions = [...this.group.permissions, updatedPermission];
			return;
		} else {
			this.group.permissions = this.group.permissions.filter((permission) => {
				return permission.id !== updatedPermission.id;
			});
		}
	}

	getGroups(): void {
		this.groupsService.getGroups().then(groups => {
			this.groups = groups;
		});
	}


	openUpdateGroup(groupId: Number): void {
		this.display = true;
		this.group = { ...this.getById(groupId) };
		if (this.group.permissions) {
			this.group.permissions.forEach(permissionChecked => {
				this.permissions = this.permissions.filter(permission => {
					if (permission.id === permissionChecked.id) {
						permission.checked = true;
					}
					return permission;
				});
			});
		}
	}

	getById(groupId: Number) {
		for (let group of this.groups) {
			if (group.id == groupId) {
				return group;
			}
		}
		return null;
	}

	deleteGroup(id: number): void {
		this.confirmationService.confirm({
			message: 'Tem certeza que deseja excluir esse registro?',
			header: 'Excluir',
			icon: 'fa fa-question-circle',
			accept: () => {
				this.groupsService.deleteGroup(id).then(res => {
					this.groups = this.groups.filter(function (val) {
						return val.id != id;
					});
				});
			}
		});
	}

	showDialog() {
		this.group = new Group();
		this.permissions = this.permissions.filter(permission => {
			permission.checked = false;
			return permission;
		});
		this.display = true;
	}

	closeDialog() {
		this.groupForm.reset();
		this.group = new Group();
	}

	hideMessage(field: any): boolean {
		return (field.disabled || field.valid || field.pristine);
	}

}
