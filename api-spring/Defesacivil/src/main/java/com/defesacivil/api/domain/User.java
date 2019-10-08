package com.defesacivil.api.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.defesacivil.api.enums.Profile;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class User implements Serializable {
	
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
	@NotBlank(message = "Informe nome e sobrenome. ")
	@Size(min = 5 , message="Nome e sobrenome deve conter no minimo 5 caracteres. ")
	@Size( max = 150 , message="Limite de caracteres violado.")
	private String nome;
	@Column
	@NotBlank(message = "É nescessário informar e-mail")
	//@Email(regexp = "/^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$/", message="Informe um e-mail válido! ")
	private String email;
	@Column
	@NotBlank(message = "Uso de senha obrigatório!")
	@Size(min = 3 ,message = "Senha deve conter no minimo 3 caracteres!")
	private String password;
	@Column
	private int receiveNotification;
	@Column
	private boolean admin;
	//@Pattern(regexp =  "/^([-+]?\d{1,2}([.]\d+)?)$/")		//message="Latitude invalida.")
	@Column
	private String lastLatitude;
	//@Pattern(regexp = "/ ^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$ \r\n/",message="Longitude invalida.")
	@Column
	private String lastLongitude;
	
	/*@ManyToOne(cascade=CascadeType.PERSIST)
	private Profile profile;*/
	
	@Column
	private boolean deleted;
	
	@ElementCollection(fetch=FetchType.EAGER) //garante que sejam buscados os perfils de usuário.
	@CollectionTable(name="PERFIS")
	private Set<Integer> perfis =  new  HashSet<>();
	
	
	public User() {
		// todo usuário terá na criação o perfil de  cliente automático
	//	addPerfil(Perfil.CLIENTE);
	}
	
	public User(String nome, String email, String password) {
	super();
	this.nome = nome;
	this.email = email;
	this.password = password;
	// addPerfil(Perfil.CLIENTE);
	
		
	}
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
	public String getNome() {
		return nome;
	}

	
	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public Set<Profile> getProfile(){
		return perfis.stream().map(x -> Profile.toEnum(x)).collect(Collectors.toSet());
	}
	public  void addPerfil (Profile perfil){
		perfis.add(perfil.getCod());
		
	}
	public int getReceiveNotification() {
		return receiveNotification;
	}

	public void setReceiveNotification(int receive_notification) {
		this.receiveNotification = receive_notification;
	}

	public boolean isAdmin() {
		return admin;
	}

	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

	public String getLastLatitude() {
		return lastLatitude;
	}

	public void setLastLatitude(String lastLatitude) {
		this.lastLatitude = lastLatitude;
	}

	public String getLastLongitude() {
		return lastLongitude;
	}

	public void setLastLongitude(String lastLongitude) {
		this.lastLongitude = lastLongitude;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
}