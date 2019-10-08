package com.defesacivil.api.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.defesacivil.api.domain.Markup;
import com.defesacivil.api.domain.MarkupType;
import com.defesacivil.api.repositories.MarkupRepository;
@Service
public class MarkupService {
	
	@Autowired
	private MarkupRepository markupRepository;
	
	
	public Markup insert(Markup obj) {
		
		return markupRepository.save(obj);
	}
	
	public List <Markup> findAll(){
		
		return markupRepository.findAll();
	}
	
	public Markup findById(Integer id) {
		Optional<Markup> obj = markupRepository.findById(id);
		return obj.orElse(null) ;
	}
	
	public void delete (Integer id) {
		markupRepository.deleteById(id);
	}
	
	public Markup update(Markup obj) {
		//	find(obj.getId());
			return markupRepository.save(obj);
		}
}
