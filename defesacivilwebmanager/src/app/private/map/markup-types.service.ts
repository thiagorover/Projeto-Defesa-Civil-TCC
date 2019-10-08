import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {environment} from "../../../environments/environment"

import "rxjs/add/operator/toPromise";
import {MarkupType} from "./markup-type";
import { RequestService } from "app/core/request.service";

@Injectable()
export class MarkupTypesService {

	private headers: Headers = new Headers({'Content-Type': 'application/json'});
	private typesURL = environment.serverUrl + '/markuptypes';

  constructor(private requestService : RequestService) {
  }

  getTypes(): Promise<MarkupType[]> {
    return this.requestService.get(this.typesURL)
      .then(response => {
        return response.object as MarkupType[];
      })
      .catch(this.handleError);
  }

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}
