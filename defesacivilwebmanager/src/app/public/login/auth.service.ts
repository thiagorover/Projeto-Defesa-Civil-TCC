import { Injectable } from '@angular/core';
import { RequestService } from 'app/core/request.service';
import { User } from 'app/private/users/user';
import { Login } from 'app/public/login/Login';
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
	private loginUrl = environment.serverUrl + '/login';
	private logoutUrl = environment.serverUrl + '/logout';

	constructor(private requestService: RequestService,
		private http: HttpClient) {
	}
	public getToken(){
		return window.localStorage.getItem('Authorization');
	}

		public login(userLogin: Login) {
			return this.http.post(`${environment.serverUrl}/login`,
			userLogin, { observe: 'response' },
			)
			  .pipe(tap(res => {
				console.log(res);
				console.log(res.headers.get('Authorization'));
				const autToken = res.headers.get('Authorization');
				window.localStorage.setItem('Authorization', autToken);
				console.log(autToken)
			  }))
			}

  //	public login(user: User): Promise<any> {

	/*
		const authData = btoa(`${user.email}:${user.password}`);
		this.requestService.headers.set("Authorization", `Basic ${authData}`);
		const path = `${this.loginUrl}`;

		return this.requestService.post(path, undefined).then(()=>{
			window.localStorage.setItem("authDataDefesaCivil", authData);
		});
	}
*/
	public logout(): Promise<any> {
		localStorage.removeItem("Authorization");
		return this.requestService.get(this.logoutUrl);
	}


}
