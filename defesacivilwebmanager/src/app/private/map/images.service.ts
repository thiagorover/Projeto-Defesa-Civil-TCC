import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {environment} from "../../../environments/environment"

import "rxjs/add/operator/toPromise";
import {MarkupType} from "./markup-type";
import { RequestService } from "app/core/request.service";
import { Image } from "app/private/map/image";

@Injectable()
export class ImagesService {

	private headers: Headers = new Headers({'Content-Type': 'application/json'});
	private imagesURL = environment.serverUrl + '/images';

  	constructor(private requestService : RequestService) {
  	}

  	getNotApprovedImages(): Promise<Image[]> {
    	return this.requestService.get(this.imagesURL)
      		.then(response => {
        		return response.object as Image[];
      		})
      		.catch(this.handleError);
  	}

  	approve(imageId: number): Promise<any> {
		return this.requestService.put(`${this.imagesURL}/${imageId}`, {})
		  	.then(response => {
				return response.object
			})
			.catch(this.handleError);
	}

	declineImage(imageId: number): Promise<any> {
		return this.requestService.delete(`${this.imagesURL}/${imageId}`)
		  	.then(response => {
				return response.object
		  	})
	  		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}
