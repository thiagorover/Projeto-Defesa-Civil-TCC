package com.defesacivil.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.defesacivil.api.domain.MarkupType;
import com.defesacivil.api.repositories.MarkupTypeRepository;

@Service
public class MarkupTypeService {
	
	@Autowired
	private MarkupTypeRepository markupTypeRepository;
	
	public MarkupType insert(MarkupType obj) {
		return markupTypeRepository.save(obj);
	}
	
	public List <MarkupType> findAll(){
		
		return markupTypeRepository.findAll();
	}
	
	public MarkupType findById(Integer id) {
		Optional<MarkupType> obj = markupTypeRepository.findById(id);
		return obj.orElse(null) ;
	}
	
	public void delete (Integer id) {
		markupTypeRepository.deleteById(id);//Spring 2.0
	}
	
	public MarkupType update(MarkupType obj) {
	//	find(obj.getId());
		return markupTypeRepository.save(obj);
	}
}
