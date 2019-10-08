import { Injectable } from "@angular/core";
import { Headers, Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { environment } from "../../../environments/environment";
import { Markup } from "./markup";
import { Observer, Observable } from "rxjs";
import { RequestService } from "app/core/request.service";
import { initDomAdapter } from "@angular/platform-browser/src/browser";
import { MapFilter } from "app/private/map/map-filter";

@Injectable()
export class MapService {

	private headers = new Headers({ 'Content-Type': 'application/json' });
	private markupsURl = environment.serverUrl + '/markups';

	private markupCenterObserver: Observer<Markup>;
	public markupCenterObservable: Observable<Markup>;

	constructor(private requestService: RequestService) {
		this.markupCenterObservable = new Observable<Markup>(observer => {
			this.markupCenterObserver = observer;
		}).share();
	}

	loadCenterMap(markup: Markup): void {
		this.markupCenterObserver.next(markup);
	}

	getMarkups(): Promise<Markup[]> {
		let mapFilter: MapFilter = {
			dateRange: null,
			filter: null,
			lat: null,
			long: null,
			type: null,
			distance: null
		};
		return this.getMarkupsFiltered(mapFilter);
	}

	getMarkupsFiltered(mapFilter: MapFilter): Promise<Markup[]> {
		var markupsUrl = this.markupsURl + "?";
		if (mapFilter.filter) {
			markupsUrl += "filter=" + mapFilter.filter;
		}
		if (mapFilter.type) {
			markupsUrl += "&type=" + mapFilter.type;
		}
		if (mapFilter.dateRange && mapFilter.dateRange.length == 2) {
			let initialDateString = this.getDateFilter(mapFilter.dateRange[0]);
			let endDateString = this.getDateFilter(mapFilter.dateRange[1]);

			markupsUrl += "&initialDate=" + initialDateString;
			markupsUrl += "&endDate=" + endDateString;
		}
		if (mapFilter.lat && mapFilter.long && mapFilter.distance) {
			markupsUrl += `&lat=${mapFilter.lat}&lon=${mapFilter.long}&distance=${mapFilter.distance}`
		}
		return this.requestService.get(markupsUrl)
			.then(response => {
				let markups = response.object as Markup[];
				return markups;
			})
			.catch(this.handleError);
	}

	private getDateFilter(date: Date): string {
		return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
	}

	getMarkup(id: number): Promise<Markup> {
		return this.requestService.get(`${this.markupsURl}/${id}`)
			.then(response => {
				return response.object as Markup;
			})
			.catch(this.handleError);
	}

	saveMarkup(markup: Markup): Promise<Markup> {
		return this.requestService.post(`${this.markupsURl}`, markup)
			.then(res => res.object as Markup)
			.catch(this.handleError);
	}

	updateMarkup(markup: Markup): Promise<Markup> {
		return this.requestService.put(`${this.markupsURl}/${markup.id}`, JSON.stringify({
			description: markup.description,
			status: markup.status
		})).then(res => res.object as Markup)
			.catch(this.handleError);
	}

	deleteMarkup(markupId: number): Promise<void> {
		return this.requestService.delete(`${this.markupsURl}/${markupId}`)
			.then(res => {
			})
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}
