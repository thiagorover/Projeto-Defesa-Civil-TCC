import { Component } from '@angular/core';
import { User } from 'app/private/users/user';
import { Login } from 'app/public/login/Login';
import { Router } from '@angular/router';
import { AuthService } from 'app/public/login/auth.service';
import { UsersService } from 'app/private/users/users.service';
export class Hero {

	constructor(
		public id: number,
		public name: string,
		public power: string,
		public alterEgo?: string
	) { }

}

@Component({
	templateUrl: 'login.component.html'
})
export class LoginComponent {
	public userLogin: Login = new Login();
	public user: User = new User();
	public forgottenEmail: string;
	public display = false;

	constructor(private loginService: AuthService, private userService: UsersService, private router: Router) { }

	public login(){
		this.loginService.login(this.userLogin).subscribe(  resp => {
		   console.log(this.userLogin)

		this.userService.buscaUsuariologado(this.userLogin.email).then(() => {
			console.log("-------------------- CAPTUROUUUU OO   LOGINNNNNNNNNNNNN")
		});


		console.log(resp.headers)
		this.router.navigate(['private/map']);

		}
		 , err => {
	/*	  this.shared.token = null;
		  this.shared.user = null;
		  this.shared.showTemplate.emit(false);
		  this.message = 'Erro ';*/
		});
	}
	/*	public login() {
			this.loginService.login(this.user).then(() => {
				this.router.navigate(['private/map']);
			});
		}*/

		/*public showDialog() {
			this.display = !this.display;
		}*/

		/*public generatePassword() {
			this.userService.resetPassword(this.forgottenEmail).then(response =>{
				this.display = false;
			}).catch(error =>{
				console.error(error);
			})
		}*/

}
