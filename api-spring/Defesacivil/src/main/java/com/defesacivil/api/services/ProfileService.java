package com.defesacivil.api.services;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.defesacivil.api.domain.Profile;
import com.defesacivil.api.repositories.ProfileRepository;

@Service
public class ProfileService {
	
	@Autowired
	private ProfileRepository profileRepository;
	
	public Profile save(Profile profile) {
		return profile = profileRepository.save(profile);
	}
	
	
	public Optional<Profile> findById(int id){
		return profileRepository.findById(id);
	}
	
	public Optional<Profile> getProfile(int id){
		Optional<Profile> profile = profileRepository.findById(id);
		return profile;
	}
	
	public Profile getOne(int id) {
		Profile profile = profileRepository.getOne(id);
		return profile;
	}
	
	public void delete(Profile profile) {
		profileRepository.delete(profile);
	}
	
	public List<Profile> findAll(){
		List<Profile> profiles = profileRepository.findAll();
		return profiles;
	}
}