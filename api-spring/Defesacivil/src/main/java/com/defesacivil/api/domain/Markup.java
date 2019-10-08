
package com.defesacivil.api.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Markup implements Serializable{

	private static final long serialVersionUID = 1L;
	
	
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	protected int id ;
	
	@Column
	protected String description;
	
	private String latitude;
	
	private String longitude;
	/*
	@OneToOne(cascade=CascadeType.ALL, mappedBy="markup")
	private MarkupType marckupType;
    */
	@JsonFormat(pattern="dd/MM/yyyy HH:mm")
	@Column(updatable=false)
	@CreationTimestamp
	protected Date dataCreate;
	
	@JsonFormat(pattern="dd/MM/yyyy HH:mm")
	@UpdateTimestamp
	protected Date dataUpdate;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
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

	public void setDataUpdate(Date dataUpdate) {
		this.dataUpdate = dataUpdate;
	}
}
