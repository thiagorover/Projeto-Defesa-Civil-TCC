import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private router: Router) { }
/*
	canActivate(): Observable<boolean> | Promise<boolean> | boolean {
		if (window.localStorage.getItem("Authorization")) {
			// this.router.navigate(['private/map']);
			alert("ta logaado");
			return true;
		}
		alert("não ta logado");
		this.router.navigate(['login']);
		return false;
	}*/


	canActivate(
	route: ActivatedRouteSnapshot, 
	state: RouterStateSnapshot): Observable<boolean> | boolean {
	if(window.localStorage.getItem("Authorization") != null){
		console.log("LOGADO")
	return true;
		}
		console.log("NÃO LOGADO")
	this.router.navigate(['/login']);

	return false;
	}
}
