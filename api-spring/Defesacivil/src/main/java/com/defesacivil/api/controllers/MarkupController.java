package com.defesacivil.api.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.defesacivil.api.domain.Markup;
import com.defesacivil.api.services.MarkupService;


@RestController

@RequestMapping(value="/markups")
public class MarkupController {
	
	@Autowired
	private MarkupService markupService;
	
//	@PreAuthorize("hasAnyRole('ADMIN')")
	@RequestMapping(method=RequestMethod.POST)
	public  ResponseEntity<Void> add(@RequestBody Markup markup){
		markupService.insert(markup);
	return  ResponseEntity.noContent().build();
	}
	
//	@RequestMapping(method=RequestMethod.GET)
//	public ResponseEntity<List <Markup>> findAll() {
//		List <Markup> listMarkup = markupService.findAll();
//	return ResponseEntity.ok().body(listMarkup);	
//	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.GET)
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		Markup obj = markupService.findById(id);
		return ResponseEntity.ok().body(obj);
	}
  //  @PreAuthorize("hasAnyRole('ADMIN')")
	@RequestMapping(value="/{id}", method=RequestMethod.DELETE)
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		markupService.delete(id);
		return ResponseEntity.noContent().build();
	}
///    @PreAuthorize("hasAnyRole('ADMIN')")
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
	public ResponseEntity<Void> update(@RequestBody Markup obj, @PathVariable Integer id){
		obj.setId(id);
		obj = markupService.update(obj);
		return  ResponseEntity.noContent().build();
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity<List <Markup>> buscarMarcacao(@RequestParam(value="filter", defaultValue="0") String filter,
			                                            @RequestParam(value="type", defaultValue="0") String type,
			                                            @RequestParam(value="initialDate", defaultValue="10/12/2018") String initialDate,
			                                            @RequestParam(value="endDate", defaultValue="10/12/2018") String endDate,
			                                            @RequestParam(value="lon", defaultValue="0") String lon,
			                                            @RequestParam(value="lat", defaultValue="0000000") String lat,
			                                            @RequestParam(value="distance", defaultValue="000000") long distance) {
	
		System.out.println(lat);
		System.out.println(filter);
		List <Markup> listMarkup = markupService.findAll();
	//	List <Markup> listMarkup = new ArrayList<Markup>(); //markupService.findAll();
	return ResponseEntity.ok().body(listMarkup);	
	}
}