package com.example.Fenalait.token;

import java.util.Set;

import com.example.Fenalait.model.Role;


public class AuthResponse {

	private Long id;
	private String email;
	private Set<Role> role;
	private String tokenRefresh;
	private String tokenAccess;
	private String prenom;
	private String nom;
	
	public AuthResponse() {}
	

	public AuthResponse(Long id, String email, Set<Role> role, String tokenRefresh, String tokenAccess, String prenom,
			String nom) {
		super();
		this.id = id;
		this.email = email;
		this.role = role;
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

	public Set<Role> getRole() {
		return role;
	}

	public void setRole(Set<Role> role) {
		this.role = role;
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
