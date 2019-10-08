import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthChildrenGuard implements CanActivateChild {
	constructor(private router: Router) { }
	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
		if (window.localStorage.getItem("Authorization")) {
	
			return true;
		}
		//CLASSE NÃO UTILIZADA, A SER RETIRADA !!!
		this.router.navigate(['login']);
		return false;
	}
}
