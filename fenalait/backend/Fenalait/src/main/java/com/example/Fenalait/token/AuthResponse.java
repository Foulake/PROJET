package com.example.Fenalait.token;

import java.util.Set;

import com.example.Fenalait.model.Role;

public class AuthResponse {

	private Long id;
	private String email;
	private Set<Role> roles;
	private String tokenRefresh;
	private String tokenAccess;
	private String prenom;
	private String nom;

	public AuthResponse() {}

	
	public AuthResponse(Long id, String email, Set<Role> roles, String tokenRefresh, String tokenAccess, String prenom,
			String nom) {
		super();
		this.id = id;
		this.email = email;
		this.tokenAccess = tokenAccess;
		this.roles = roles;
		this.tokenRefresh = tokenRefresh;
		this.tokenAccess = tokenAccess;
		this.prenom = prenom;
		this.nom = nom;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Set<Role> getRoles() {
		return roles;
	}


	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}


	public String getTokenRefresh() {
		return tokenRefresh;
	}


	public void setTokenRefresh(String tokenRefresh) {
		this.tokenRefresh = tokenRefresh;
	}


	public String getTokenAccess() {
		return tokenAccess;
	}


	public void setTokenAccess(String tokenAccess) {
		this.tokenAccess = tokenAccess;
	}


	public String getPrenom() {
		return prenom;
	}


	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}


	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}

	
	
}
