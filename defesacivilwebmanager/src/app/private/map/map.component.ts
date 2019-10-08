import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Message } from "primeng/primeng";
import { SelectItem } from "primeng/components/common/api";
import { MapService } from "./map.service";
import { MarkupTypesService } from "./markup-types.service";
import { Markup } from "./markup";
import { Router, ActivatedRoute, Params, Route, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { MapFilter } from "app/private/map/map-filter";

declare var google: any;

@Component({
	templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
	@ViewChild("markerForm") markerForm: HTMLFormElement;
	options: any;

	overlays: any[] = [];
	dialogVisible: boolean;
	markerTitle: string;
	selectedPosition: any;
	infoWindow: any;
	draggable: boolean;

	msgs: Message[] = [];
	subscriptionCenterMap: Subscription;

	map: any;
	markers: any[] = [];
	heatmap: any = null;
	isHeatmapActive: boolean = false;
	heatmapTooltipMessage: string = "Habilitar heatmap";
	jllePosition = new google.maps.LatLng(-26.307471, -48.845911);

	markup: Markup = new Markup();
	markups: Markup[] = [];
	markupTypes: SelectItem[] = [{ label: "Selecione um tipo", value: null }];

	markupTypesFilter: SelectItem[] = [{ label: "TODOS", value: null }];
	selectedTypesFilter: number = null;

	calendarLocale = {
		firstDayOfWeek: 0,
		dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
		dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
		dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
		monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
		monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
		today: 'Hoje',
		clear: 'Limpar'
	};
	rangeDates: Date[] = this.getDateFilterDates();

	constructor(private mapService: MapService,
		private markupTypesService: MarkupTypesService,
		private router: ActivatedRoute) {
	}

	ngOnInit() {
		this.initMap();

		this.subscriptionCenterMap = this.mapService.markupCenterObservable.subscribe(markup => {
			this.centralizeMap("" + markup.latitude, "" + markup.longitude);
		});

		this.markupTypesService.getTypes().then(mTypes => {
			mTypes.forEach((mType) => {
				this.markupTypes.push({ label: mType.description, value: mType.id });
				this.markupTypesFilter.push({ label: mType.description, value: mType.id });
			});
		});
	}

	private getDateFilterDates(): Date[] {
		let earlyDate = new Date();
		earlyDate.setDate(earlyDate.getDate() - 15); //- 7

		let endDate = new Date();
		endDate.setDate(endDate.getDate() + 1);
		return [
			earlyDate,
			endDate
		]
	}

	private getMarkups() {
		if (this.isHeatmapActive) {
			return;
		}
		let mapCenter = this.map.getCenter();

		let mapFilter: MapFilter = {
			filter: null,
			type: this.selectedTypesFilter,
			dateRange: this.rangeDates,
			lat: mapCenter.lat(),
			long: mapCenter.lng(),
			distance: 4
		};

		this.mapService.getMarkupsFiltered(mapFilter).then(markups => {
			this.overlays = [];
			this.markups = [...markups];
			markups.forEach((markup) => {
				this.plotPoint(markup);
			});
		});
	}

	private initMap() {
		this.options = {
			center: this.jllePosition,
			zoom: 16,
			maxZoom: 18,
			minZoom: 14
		};
	}

	setMap(event): void {
		var me = this;
		this.map = event.map;

		this.getMarkups();

		this.map.addListener('tilesloaded', () => {
			this.getMarkups();
		});

		this.router.queryParams.subscribe((params: Params) => {
			this.centralizeMap(params['latitude'], params['longitude']);
		});
		let inputDiv = document.getElementById('pac-input-div');
		let input = document.getElementById('pac-input');
		let heatMap = document.getElementById('pac-button');
		let dateFilter = document.getElementById('satanas');
		let filterButton = document.getElementById('filter-button');

		let searchBox = new google.maps.places.SearchBox(input);

		this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputDiv);
		this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(heatMap);
		this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(dateFilter);
		this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(filterButton);

		let mapBounds = this.map.getBounds();
		this.map.addListener('bounds_changed', () => {
			searchBox.setBounds(mapBounds);
		});

		let markers = [];
		let map = this.map;
		searchBox.addListener('places_changed', () => {
			let places = searchBox.getPlaces();

			if (places.length == 0) {
				return;
			}

			let bounds = new google.maps.LatLngBounds();
			places.forEach(function (place) {
				if (!place.geometry) {
					return;
				}

				if (place.geometry.viewport) {
					bounds.union(place.geometry.viewport);
					return;
				}

				bounds.extend(place.geometry.location);
			});
			map.fitBounds(bounds);

			setTimeout(() => {
				map.setZoom(map.getZoom() - 1);
			}, 2500);
		});
	}

	centralizeMap(latitude: string, longitude: string): void {
		if (latitude && longitude) {
			this.map.setCenter(new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude)));
			return;
		}
		this.map.setCenter(this.jllePosition);
	}

	handleMapClick(event) {
		this.dialogVisible = true;
		this.selectedPosition = event.latLng;
	}

	handleOverlayClick(event) {
		var position = event.overlay.getPosition();
		event.map.setCenter(position);
	}

	addMarker() {
		this.markup.latitude = this.selectedPosition.lat();
		this.markup.longitude = this.selectedPosition.lng();

		this.mapService.saveMarkup(this.markup).then(res => {
			this.markerForm.reset();
			this.markerTitle = null;
			this.dialogVisible = false;
			this.plotPoint(res);
		});
	}

	private plotPoint(markup: Markup) {
		let myLatlng = new google.maps.LatLng(markup.latitude, markup.longitude);
		let markerIcon = {
			url: './img/icone-marcador-' + markup.markup_type_id + '.png',
			scaledSize: new google.maps.Size(30, 30)
		};

		let marker = new google.maps.Marker({
			position: myLatlng,
			icon: markerIcon,
			title: markup.description
		});
		this.mapService.getMarkup(markup.id).then((theMarkup) => {
			let contentString =
				'<div id="content">' +
				'<h5 id="firstHeading" class="firstHeading">' + theMarkup.description + '</h5>' +
				'<img [src]="' + theMarkup.path + '" />' +
				'</div>';

			let infoWindow = new google.maps.InfoWindow({
				content: contentString,
				maxWidth: 400
			});
			marker.addListener('click', () => {
				infoWindow.open(this.map, marker)
			});
		});
		this.overlays = [...this.overlays, marker];
	}

	handleDragEnd(event) {
	}

	updateMapWithFilters() {
		this.getMarkups();
	}

	toggleHeatmap() {
		if (this.heatmap) {
			this.heatmap.setMap(null);
			this.heatmap.setData([]);
			this.heatmap = null;
			this.isHeatmapActive = false;
			this.showMarkers();
			this.heatmapTooltipMessage = "Habilitar heatmap";
			return;
		}

		this.hideMarkers();

		let points: any[] = [];
		this.markups.forEach((markup) => {
			points.push(new google.maps.LatLng(markup.latitude, markup.longitude));
		});

		this.heatmap = new google.maps.visualization.HeatmapLayer({
			data: points,
			map: this.map,
			radius: 20
		});

		this.heatmap.setMap(this.map);
		this.isHeatmapActive = true;
		this.heatmapTooltipMessage = "Desabilitar heatmap";
	}

	showMarkers(): void {
		this.getMarkups();
	}

	hideMarkers(): void {
		let newMarkers = this.markers;
		newMarkers.forEach((marker) => {
			marker.setMap(null);
		})
		this.overlays = [];
		this.markers = [...newMarkers];
	}

	clear() {
		this.overlays = [];
	}

	closeDialog(): void {
		this.markerForm.reset();
		this.markup = new Markup();
	}

}
