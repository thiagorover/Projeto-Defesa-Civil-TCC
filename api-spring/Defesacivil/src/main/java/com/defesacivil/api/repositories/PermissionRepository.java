package com.defesacivil.api.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.defesacivil.api.domain.Permission;

public interface PermissionRepository  extends JpaRepository<Permission , Integer>  {

}
