package com.defesacivil.api.repositories;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.defesacivil.api.domain.Profile;
import com.defesacivil.api.domain.User;

public interface ProfileRepository extends JpaRepository<Profile, Integer>{
	
	@Transactional
	Optional <Profile> findById(int id);
	
}