package com.defesacivil.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.defesacivil.api.domain.User;
import com.defesacivil.api.repositories.UserRepository;
import com.defesacivil.api.security.UserSS;

@Service	
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	UserService userServ;
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	User  user = userServ.findByEmail(email);
	if (user == null) {
		throw new UsernameNotFoundException(email);
	}
		return new UserSS(user.getId(), user.getEmail(), user.getPassword(), user.getProfile());
	}

	
}
