package com.defesacivil.api.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.defesacivil.api.controllers.EmailController;
import com.defesacivil.api.domain.User;
import com.defesacivil.api.repositories.UserRepository;
import com.defesacivil.api.security.UserSS;

@Service
public class UserService {

	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private EmailController emailController;
	
	@Autowired
	private BCryptPasswordEncoder pe;
	
	public  User save(User user) {
		String password = user.getPassword();
		user.setPassword(pe.encode(password));
		return user = userRepository.save(user);		
	}

	public User delete(User user) {
		user.setDeleted(true);
		return user = userRepository.save(user);		
	}

	public Optional<User> getUser (int id) {
		Optional<User> user = userRepository.findById(id);		
		return user;
	}
	
	public User getOne (int id) {
		User user = userRepository.getOne(id);
		return user;	
	}
	
	public List<User> findAll() {
		 List<User> users = userRepository.findAll();
		 	return users ;	
	}
	
	public User findById(Integer id) {			
		Optional<User> obj = userRepository.findById(id);
		return obj.orElse(null) ;
	}
	
	public User findByEmail(String email) {
		Optional<User> obj = userRepository.findByEmail(email);
		return obj.orElse(null);	
	}
	
	public  Optional<User> findMail(String email) {
		return userRepository.findByEmail(email);	
	}
	
	public boolean forgotPassword(User user) {
		
		Optional<User> mailUser = userRepository.findByEmail(user.getEmail());
		if (mailUser.isPresent()) {
			user = mailUser.get();
			String newPassword = generateNewPassword();
			emailController.enviarEmail(user, newPassword);
			//user.setPassword(pe.encode(newPassword));
			userRepository.save(user);
		
			return true;
		} else {
			return false;
		}
	}
	// retorna o usuário logado
 	public static UserSS authenticated() {
		try {
			return (UserSS) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		}catch(Exception e){
			return null;
		}
	}

	private String generateNewPassword() {
		UUID uuid = UUID.randomUUID();
		String random = uuid.toString();
		String newPassword = random.substring(0, 8);
		return newPassword;
	}

}
