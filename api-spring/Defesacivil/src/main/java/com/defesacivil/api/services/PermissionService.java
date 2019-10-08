package com.defesacivil.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.defesacivil.api.domain.Permission;
import com.defesacivil.api.repositories.PermissionRepository;

@Service
public class PermissionService {

	@Autowired
	private PermissionRepository permissionRepository;
	
	public  Permission insert(Permission permission) {
		return permissionRepository.save(permission);		
	}
	
	public  Permission save(Permission permission) {
		 return permission = permissionRepository.save(permission);		
	}

	public  void delete(Permission permission) {
		 permissionRepository.delete(permission);
		}

	public Optional<Permission> getPermission (int id) {
		Optional<Permission> permission = permissionRepository.findById(id);		
		return permission;
	}
	
	public Permission getOne (int id) {
		Permission permission = permissionRepository.getOne(id);
		return permission;
	}

	public List<Permission> findAll() {
		 List<Permission> permissions = permissionRepository.findAll();
		 	return permissions ;	
	}	
}
