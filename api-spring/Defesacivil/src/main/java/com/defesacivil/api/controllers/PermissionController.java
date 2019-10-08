package com.defesacivil.api.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.defesacivil.api.domain.Permission;
import com.defesacivil.api.domain.User;
import com.defesacivil.api.services.PermissionService;


@RestController
public class PermissionController {

	@Autowired 
	private PermissionService permissionService;
	
	/**
	 * Cadastrar Permissões de acesso - Rota
	 * @param permission
	 * @return
	 */

	@RequestMapping(value = "/permissions/",method = RequestMethod.POST)
	public ResponseEntity<Object>  add (  @RequestBody Permission permission ) {
		System.out.println("controller.add");
			permissionService.insert(permission);
			return new ResponseEntity<Object>("Autorização gravada com sucesso!",HttpStatus.CREATED);	
	}
	
	/**
	 * Busca todas as permissões - Rotas
	 * @return
	 */
	
	@RequestMapping(value = "/permissions",method = RequestMethod.GET)
	public ResponseEntity<?>  listAllPermissions() {
		List<Permission> permissions = permissionService.findAll();
		if(permissions.isEmpty()){
			return new ResponseEntity<Object>( "Permissões não encontradas.", HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<Permission>>(permissions, HttpStatus.OK);
	}	
	
	
	/**
	 * Busca a permissão pelo ID - Rotas
	 * @return
	 */
	
	@RequestMapping(value = "/permissions/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getUser(@PathVariable("id") int id){		
		Optional<Permission> permission = permissionService.getPermission(id);
		if(!permission.isPresent()){
			return new ResponseEntity<Object>("Permissão não Encontrada.", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<Object>(permission, HttpStatus.FOUND);
	}
	
	
	// update USER - Route.put('users/:id?', 'UserController.update') // -> admin ou
		// proprio usuario DONE()
		@RequestMapping(value = "/permissions/{id}", method = RequestMethod.PUT)
		public ResponseEntity<Object> updatePermission(@PathVariable("id") int id) {
			
			Optional<Permission> permissionTeste = permissionService.getPermission(id);
			
			if(permissionTeste.isPresent()) {
				
				/**
				 * Nesse ponto será necessário implementar token e validar se o usuário logado é admin
				 * caso seja admin, o mesmo terá permissão para alterar os usuários.
				 */
				
				// if (request.currentUser.is_admin == 1 || request.currentUser.id ===
				// request.param('id')) {
				
				Permission permission = permissionService.getOne(id);
				permission = permissionService.save(permission);
				return new ResponseEntity<Object>(permission, HttpStatus.OK);
			} else {
				return new ResponseEntity<Object>("O usuário não foi encontrado no banco de dados!", HttpStatus.NO_CONTENT);
			}
		}
	
	/**
	 * Deleta uma permissão de acesso - Rota
	 * @param id
	 * @return
	 */
	
	@RequestMapping(value = "/permissions/{id}",method = RequestMethod.DELETE)
	public  ResponseEntity<Object> delete (@PathVariable("id") int id) { 
		Permission permission  = permissionService.getOne(id);
		permissionService.delete(permission);
		return new ResponseEntity<Object>("Permissão excluida com sucesso!", HttpStatus.OK);	
	} 
	
	
}