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
public class Vote implements Serializable{
	
	
	private static final long serialVersionUID = 1L;
	
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	protected int id ;
	
	@JsonFormat(pattern="dd/MM/yyyy HH:mm")
	@Column(updatable=false)
	@CreationTimestamp
	protected Date dataCreate;
	
	@JsonFormat(pattern="dd/MM/yyyy HH:mm")
	@UpdateTimestamp
	protected Date dataUpdate;

	@Column
	protected String description;
	
	@Column
	private int type;
	
	@Column
	private Markup markup;
	
	@Column
	private User user;
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
