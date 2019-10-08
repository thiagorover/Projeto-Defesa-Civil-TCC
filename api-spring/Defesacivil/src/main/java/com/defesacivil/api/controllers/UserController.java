package com.defesacivil.api.controllers;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.defesacivil.api.domain.User;
import com.defesacivil.api.services.UserService;

@RestController
@RequestMapping(value = "/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	/**
	 * Método de criação do Usuário
	 * @param user
	 * @param bindingResult
	 * @return true
	 */
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Object> add(@Valid @RequestBody User user, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Object>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);
		} else {
			Optional<User> mailUser = userService.findMail(user.getEmail());
			if (!mailUser.isPresent()) {
					
				user = userService.save(user);
				return new ResponseEntity<Object>("Usuario cadastrado com sucesso!", HttpStatus.CREATED);

			} else {
				return new ResponseEntity<Object>("E-mail já cadastrado em nossa base de dados.",
						HttpStatus.NOT_ACCEPTABLE);
			}
		}
	}
	
	/**
	 * Método de Busca todos Usuários
	 * @param user
	 * @param bindingResult
	 * @return All
	 */

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> listAllUsers() {
		List<User> users = userService.findAll();
		if (users.isEmpty()) {
			return new ResponseEntity<Object>("Usuários não encontrados.", HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);// ok
	}
	
	/**
	 * Método que retorna um Usuário de acordo com ID
	 * @param user
	 * @param id
	 * @return Usuário
	 */

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Object> getUser(@RequestBody Optional<User> user, @PathVariable("id") int id) {
		user = userService.getUser(id);
		if (!user.isPresent()) {
			return new ResponseEntity<Object>("Usuário não Encontrado.", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Object>(user, HttpStatus.FOUND);
	}
	
	/**
	 * Método que Atualiza o Usuário
	 * @param user
	 * @param id
	 * @return true/false
	 */

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Object> updateUser(@RequestBody User user, @PathVariable("id") int id) {
		Optional<User> userteste = userService.getUser(id);
		if (!userteste.isPresent()) {
			return new ResponseEntity<Object>("Usuario não encontrado.", HttpStatus.NO_CONTENT);
		} else {
			user = userService.save(user);
			return new ResponseEntity<Object>(user, HttpStatus.OK);
		}
	}// ok
	
	/**
	 * Método de Deleção do Usuário
	 * @param id
	 * @return true/false
	 */

	// "Delete" - Route.delete('users/:id?', 'UserController.delete') admin ou
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> delete(@PathVariable("id") int id) {
		User user = userService.getOne(id);
		user = userService.delete(user);
		return new ResponseEntity<Object>("Usuario desativado com sucesso!", HttpStatus.OK);
	}// ok

	@RequestMapping(value = "/ulocation/", method = RequestMethod.PUT)
	public ResponseEntity<Object> uLocation(@RequestBody User user, BindingResult bindingResult) {
		Optional<User> test = userService.getUser(user.getId());
		if (test.isPresent()) {
			if (bindingResult.hasFieldErrors(user.getLastLatitude())
					|| bindingResult.hasFieldErrors(user.getLastLongitude())) {
				return new ResponseEntity<Object>("Coordenada invalida.", HttpStatus.NOT_ACCEPTABLE);
			} else {
				user = userService.save(user);
				return new ResponseEntity<Object>(user, HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<Object>("Usuário não Encontrado.", HttpStatus.NOT_FOUND);
		}
	}
	
	/**
	 * Ativação do Usuário
	 * @param id
	 * @return
	 */
	
	@RequestMapping(value = "/activate/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Object> activate(@PathVariable("id") int id) {
		boolean currentUser = true;
		if (currentUser) {
			User user = userService.getOne(id);
			user.setDeleted(false);
			user = userService.save(user);
			return new ResponseEntity<Object>("Usuario ativado com sucesso!", HttpStatus.OK);
		} else {
			return new ResponseEntity<Object>("Usuario não tem essa permissão.", HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	/**
	 * Ativação da Notificação
	 * @param id
	 * @return
	 */

	@RequestMapping(value = "/notification/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Object> updateNotification(@PathVariable("id") int id) {
		User user = userService.getOne(id);
		if (user.getReceiveNotification() == 0) {
			user.setReceiveNotification(1);
			user = userService.save(user);
			return new ResponseEntity<Object>("Notificações ativadas com sucesso!", HttpStatus.OK);
		} else {
			user.setReceiveNotification(0);
			user = userService.save(user);
			return new ResponseEntity<Object>("Notificações desativadas com sucesso!", HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/power/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Object> power(@PathVariable("id") int id) {
		boolean currentUser = true;
		if (currentUser) {
			User user = userService.getOne(id);
			if (user.getNome() != null || user.getNome() != "") {
				user.setDeleted(false);
				user = userService.save(user);
				return new ResponseEntity<Object>("Usuario ativado com sucesso!", HttpStatus.OK);
			} else {
				return new ResponseEntity<Object>("Usuario não encontrado.", HttpStatus.NOT_ACCEPTABLE);
			}
		} else {
			return new ResponseEntity<Object>("Usuario não tem essa permissão.", HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	/**
	 * Atualiza o Password 
	 * @param user
	 * @param result
	 * @return
	 * @throws Throwable
	 */

	//Recuperação de password
	@RequestMapping(value = "/forgot", method = RequestMethod.POST)
	public ResponseEntity<Object> resetPassword(@RequestBody User user) throws Throwable {
		
		boolean retorno = userService.forgotPassword(user);
		if(retorno) {
		
			return new ResponseEntity<Object>("Senha redefinida, e-mail enviado com sucesso!", HttpStatus.CREATED);
		} else {
			return new ResponseEntity<Object>("E-mail não consta na nossa base de dados!", HttpStatus.NO_CONTENT);
		}
	}
	
	/**
	 * Validação do Logout
	 * @param user
	 * @param result
	 * @return
	 */

	// doLogout - Route.post('doLogout', 'UserController.doLogout')
	@RequestMapping(value = "/doLogout/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Object> doLogout(@Valid @RequestBody User user, BindingResult result) {
		System.out.println("controller.doLogout");
		// Session.SESSION_DESTROYED_EVENT;
		// return response.ok('UsuÃ¡rio deslogado com sucesso') }
		return new ResponseEntity<Object>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/getbymail/{email}", method = RequestMethod.GET)
	public ResponseEntity<Object> getUser(@PathVariable("email") String email) {
		
		Optional<User> user = userService.findMail(email);
		//user = userService.getUser(id);
		if (!user.isPresent()) {
			return new ResponseEntity<Object>("Usuário não Encontrado.", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Object>(user, HttpStatus.FOUND);
	}
	

}