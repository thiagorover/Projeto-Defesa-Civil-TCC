package com.defesacivil.api.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Permission implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	protected int id ;
	
	@Column
	private String description;
	
	@Column
	private String slug;
	
	@Column
	@JsonFormat(pattern="dd-MMM-YYYY HH:mm")
	private Date dataCreate;
	
	@Column
	@JsonFormat(pattern="dd-MMM-YYYY HH:mm")
	private Date dataUpdate;
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}
	
	public Date getDataCreate() {
		return dataCreate;
	}

	public void setDataCreate(Date dataCreate) {
		this.dataCreate = dataCreate;
	}
	
	public Date getDataUpdate() {
		return dataUpdate;
	}

	public void setDatacreate(Date dataUpdate) {
		this.dataUpdate = dataUpdate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setDataUpdate(Date dataUpdate) {
		this.dataUpdate = dataUpdate;
	}
	
}