package com.defesacivil.api;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DefesacivilApplication implements CommandLineRunner{

	/*@Autowired
	UserRepository userRepo;
	@Autowired
	private BCryptPasswordEncoder pe;*/
	
	public static void main(String[] args) {
		SpringApplication.run(DefesacivilApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		
	/*
	
		User user = new User("admin", "admin@gmail.com", pe.encode("123456789"));
		user.addPerfil(Profile.ADMIN);
		
		User user1 = new User("admin", "operador@gmail.com", pe.encode("123456789"));
		user1.addPerfil(Profile.OPERADOR);
		
    	userRepo.save(user);
    	userRepo.save(user1);*/

	}
}
