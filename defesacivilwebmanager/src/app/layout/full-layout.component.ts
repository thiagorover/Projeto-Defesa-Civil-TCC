import { Component, OnInit } from '@angular/core';
import { MapService } from "../private/map/map.service";
import { Markup } from "../private/map/markup";
import { Router } from "@angular/router";
import { AuthService } from 'app/public/login/auth.service';
import { User } from 'app/private/users/user';
import { UsersService } from 'app/private/users/users.service';
import { MapFilter } from 'app/private/map/map-filter';
import { ImagesService } from 'app/private/map/images.service';
import { Image } from 'app/private/map/image';

declare var google: any;
export const ACCEPT = 2;
export const DECLINE = 0;
@Component({
	selector: 'app-dashboard',
	templateUrl: './full-layout.component.html',
	styleUrls: ['full-layout.component.css'],
	providers: [MapService, ImagesService]
})
export class FullLayoutComponent implements OnInit {

	public disabled: boolean = false;
	public status: { isopen: boolean } = { isopen: false };

	public markups: Markup[] = [];
	private notApprovedImages: Image[] = [];
	public dialogMarkup: Markup;
	public display: boolean;
	public displayChangePassword = false;
	public changePasswordUser = {
		password: "",
		newPassword: "",
		newPasswordConfirm: ""
	}

	constructor(private authService: AuthService, private router: Router,
		private mapService: MapService, private imagesService: ImagesService,
		private userService: UsersService) {
	}

	ngOnInit(): void {
		this.getMarkupsWithInterval();
	}

	private getMarkupsWithInterval() {
		this.getMarkups();
		setInterval(() => {
			this.getMarkups();
		}, 15000);
	}

	private getMarkups() {
		let mapFilter: MapFilter = {
			filter: 'inapproval',
			dateRange: null,
			lat: null,
			long: null,
			type: null,
			distance: 4
		};
		this.mapService.getMarkupsFiltered(mapFilter).then(markups => {
			this.markups = markups;
		});
	}

	public openModal(markup: Markup): void {
		this.display = true;
		this.mapService.getMarkup(markup.id).then((theMarkup) => {
			this.dialogMarkup = theMarkup;
		});
	}

	public closeDialog(): void {
		this.dialogMarkup = null;
		this.display = false;
	}

	public accept(dialogMarkup: Markup): void {
		dialogMarkup.status = ACCEPT;
		this.mapService.updateMarkup(dialogMarkup).then(() => {
			this.markups = this.markups.filter((val) => {
				return val.id != dialogMarkup.id;
			});
			this.closeDialog();
		});
	}

	public decline(dialogMarkup: Markup): void {
		dialogMarkup.status = DECLINE;
		this.mapService.updateMarkup(dialogMarkup).then(() => {
			this.markups = this.markups.filter((val) => {
				return val.id != dialogMarkup.id;
			});
			this.closeDialog();
		});
	}

	public redirectToMap(markup: Markup): void {
		this.router.navigate(['/private/map'], {
			queryParams: {
				latitude: markup.latitude,
				longitude: markup.longitude,
			}
		});
		this.mapService.loadCenterMap(markup);
	}

	public toggled(open: boolean): void {
		console.log('Dropdown is now: ', open);
	}

	public toggleDropdown($event: MouseEvent): void {
		$event.preventDefault();
		$event.stopPropagation();
		this.status.isopen = !this.status.isopen;
	}

	public logout(): void {
		this.authService.logout();
		this.router.navigate(['login']);
	}

	public showChangePasswordDialog(): void {
		this.displayChangePassword = true;
	}

	public changePassword(): void {
		this.userService.changePassword(this.changePasswordUser.password,this.changePasswordUser.newPassword).then(response =>{
			this.displayChangePassword = false;
		}).catch(error =>{
			console.error(error);
		});
	}
}
