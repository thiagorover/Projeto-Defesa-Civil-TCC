package com.defesacivil.api.controllers;

import java.util.List;
import java.util.Optional;

import javax.swing.plaf.synth.SynthSeparatorUI;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.defesacivil.api.domain.Profile;
import com.defesacivil.api.services.ProfileService;

@CrossOrigin(origins = "http://localhost", maxAge = 3600)
@RestController
@RequestMapping(value = "/profiles")
public class ProfileController {
	
	@Autowired
	private ProfileService profileService;
	
	/**
	 * Método de criação do Profile
	 * 
	 * @param profile
	 * @param bindingResult
	 * @param true
	 */
//	@PreAuthorize("hasAnyRole('ADMIN')")
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Object> add(@Valid @RequestBody Profile profile, BindingResult bindingResult) {
		
		if (bindingResult.hasErrors()) {
			
			return new ResponseEntity<Object>(bindingResult.getAllErrors(), HttpStatus.NOT_ACCEPTABLE);

		} else {
			
			Optional<Profile> profileId = profileService.findById(profile.getId());

			if (!profileId.isPresent()) {

				profile.setStatus(true);
				profile = profileService.save(profile);
				return new ResponseEntity<Object>("Perfil Cadastrado.", HttpStatus.OK);
			} else {

				return new ResponseEntity<Object>("Perfil já existente.", HttpStatus.NOT_ACCEPTABLE);
			}
		}
	}

	/**
	 * Função expecifica para alteração do profile
	 * @param profile
	 * @param id
	 * @return true/false
	 */
	
//	@PreAuthorize("hasAnyRole('ADMIN')")
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Object> updateProfile(@RequestBody Profile profile, @PathVariable("id") int id){
		
		Optional<Profile> Profileteste = profileService.getProfile(id);

		if(Profileteste.isPresent()) {
			profile = profileService.save(profile);
			return new ResponseEntity<Object>("Profile alterado com sucesso!", HttpStatus.OK);
		} else {
			return new ResponseEntity<Object>("Profile não encontrado", HttpStatus.NOT_ACCEPTABLE);
		}
	}
	
	/**
	 * Função expecifica para deleção do profile
	 * @param profile
	 * @param id
	 * @param true/false
	 */
//	@PreAuthorize("hasAnyRole('ADMIN')")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Object> delete(@PathVariable("id") int id){
		
		Profile profile = profileService.getOne(id);
		profileService.delete(profile);
		
	    System.out.println("AQUI");
		
		Optional<Profile> Profileteste = profileService.getProfile(profile.getId());
		
		if(Profileteste.isPresent()) {
			return new ResponseEntity<Object>("Profile não deletado!", HttpStatus.NOT_ACCEPTABLE);
		}else {
			return new ResponseEntity<Object>("Profile deletado con sucesso!", HttpStatus.OK);
		}
	}
	
	
	/**
	 * Função expecifica para retornar um profile
	 * @param profile
	 * @param id
	 * @return Profile
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Object> getProfile(@RequestBody Optional<Profile> profile, @PathVariable("id") int id){
		profile = profileService.getProfile(id);
		
		if(!profile.isPresent()) {
			return new ResponseEntity<Object>("Profile não encontrado!", HttpStatus.NOT_ACCEPTABLE);
		} else {
			return new ResponseEntity<Object>(profile, HttpStatus.OK);
		}
	}
	
	/**
	 * Função expecifica para retornar todos os profiles
	 * @param profile
	 * @return Profiles
	 */
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<?> listAllProfiles(){
		List<Profile> profiles = profileService.findAll();
		if(profiles.isEmpty()) {
			return new ResponseEntity<Object>("Profiles não encontrados!", HttpStatus.NOT_ACCEPTABLE);
		} else {
			return new ResponseEntity<Object>(profiles , HttpStatus.OK);
		}
	}
}