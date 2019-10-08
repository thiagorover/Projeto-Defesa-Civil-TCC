import { Component, OnInit } from "@angular/core";
import { MapService } from "app/private/map/map.service";
import { MarkupView } from "app/private/markups/markupView";
import { UsersService } from "app/private/users/users.service";
import { ConfirmationService } from "primeng/components/common/confirmationservice";

@Component({
	templateUrl: './markup.component.html'
})
export class MarkupComponent implements OnInit {
	public markupsView: MarkupView[] = [];

	public columns: any = [
		{ field: 'description', header: 'Descrição' },
		{ field: 'markupType', header: 'Tipo de Marcação' },
		{ field: 'latitude', header: 'Latitude' },
		{ field: 'longitude', header: 'Longitude' },
		{ field: 'createdDate', header: 'Criado em' }
	];

	constructor(private mapService: MapService, private userService: UsersService,
		private confirmationService: ConfirmationService) { }

	ngOnInit() {
		this.getMarkups();
	}

	private getMarkups() {
		this.mapService.getMarkups().then(markups => {
			markups.forEach(markup => {
				this.markupsView = [...this.markupsView, {
					id: markup.id,
					description: markup.description,
					markupType: markup.markup_type_id,
					latitude: markup.latitude,
					longitude: markup.longitude,
					createdDate: markup.created_date
				}];
			});
		});
	}

	public deleteMarkup(markupId: number) {
		this.confirmationService.confirm({
			message: 'Tem certeza que deseja excluir esse registro?',
			header: 'Excluir',
			icon: 'fa fa-question-circle',
			accept: () => {
				this.mapService.deleteMarkup(markupId).then(() => {
					this.getMarkups();
				});
			}
		});
	}
}
