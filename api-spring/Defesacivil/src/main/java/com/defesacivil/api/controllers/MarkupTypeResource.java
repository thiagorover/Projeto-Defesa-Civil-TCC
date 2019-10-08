package com.defesacivil.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.defesacivil.api.domain.MarkupType;
import com.defesacivil.api.services.MarkupTypeService;

@RestController
@RequestMapping(value="/markuptypes")
public class MarkupTypeResource {
	
	@Autowired
	private MarkupTypeService markupTypeService;
	
	@RequestMapping(method=RequestMethod.POST)
	public  ResponseEntity<Void> add(@RequestBody MarkupType markupType){
		markupTypeService.insert(markupType);
	return  ResponseEntity.noContent().build();
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List <MarkupType>> findAll() {
		List <MarkupType> listMarkup = markupTypeService.findAll();
	return ResponseEntity.ok().body(listMarkup);	
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		MarkupType obj = markupTypeService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		markupTypeService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Void> update(@RequestBody MarkupType obj, @PathVariable Integer id){
		obj.setId(id);
		obj = markupTypeService.update(obj);
		return  ResponseEntity.noContent().build();
	}
}