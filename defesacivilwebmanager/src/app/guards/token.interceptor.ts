import { Injectable, NgModule } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "../public/login/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(public auth:  AuthService){}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const clReq = request.clone({
			setHeaders: {
				Authorization: this.auth.getToken() 
				
			  }
			}
		);
		console.log("INJETOU NO HEADER");
		console.log(clReq);

		return next.handle(clReq);
	}
}
@NgModule({
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	]

})
export class Interceptor {}
