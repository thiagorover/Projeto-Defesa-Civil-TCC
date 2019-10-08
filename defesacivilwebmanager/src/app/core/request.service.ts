import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class RequestService {
	public headers: Headers;
	private options: RequestOptionsArgs;

	constructor(private http: Http, private router: Router, private toastr: ToastrService) {
		this.initialize();
	}

	private initialize(): void {
		this.headers = new Headers();
		this.headers.append("Content-Type", "application/json");
		if (!this.headers.get("Authorization")) {
			const authData = window.localStorage.getItem("Authorization");
			this.headers.set("Authorization", authData);
		}
		this.options = {
			headers: this.headers,
		}
	}

	public get(url: string): any {
		return this.http.get(url, this.options).toPromise()
			.then((res) => {
				return res.json();
			})
			.catch(error => {
				return this.handleError(error, this.toastr);
			});
	}

	public post(url: string, object: any): any {
		return this.http.post(url, object, this.options).toPromise()
			.then((res) => {
				return res.json();
			})
			.catch(error => {
				return this.handleError(error, this.toastr);
			});
	}

	public put(url: string, object: any): any {
		return this.http.put(url, object, this.options).toPromise()
			.then((res) => {
				return res.json();
			})
			.catch(error => {
				return this.handleError(error, this.toastr);
			});
	}

	public delete(url: string): any {
		return this.http.delete(url, this.options).toPromise()
			.then((res) => {
				return res.json();
			})
			.catch(error => {
				return this.handleError(error, this.toastr);
			});
	}

	private handleError(error: any, toastr: ToastrService): Promise<any> {
		const message = error.json().message;
		if (message !== undefined) {
			toastr.error(message, 'Erro!');
		} else if (!error.status) {
			toastr.error('Não foi possível enviar a requisição para o servidor!', 'Erro!');
		} else if (error.status == 401 || error.status == 403) {
			toastr.error("Usuário desconectado ou sem autorização", 'Erro!');
			localStorage.removeItem("authDataDefesaCivil");
			this.router.navigate(['login']);
		} if (error.status == 500) {
			toastr.error("Erro interno do SERVIDOR. Favor, entrar em contato com wanderkpot@gmail.com", 'Erro!');
		}
		return Promise.reject(error);
	}
}
