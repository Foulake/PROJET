package com.example.Fenalait.token;

import java.util.Set;

import com.example.Fenalait.model.Role;

public class AuthResponse {

	private String email;
	private String tokenRefresh;
	private String tokenAccess;
	private String prenom;
	private String nom;
	private Set<Role> roles;
	
	public AuthResponse() {}
	
	

	public AuthResponse(String email, String tokenRefresh, String tokenAccess, String prenom, String nom,
			Set<Role> roles) {
		this.email = email;
		this.tokenRefresh = tokenRefresh;
		this.tokenAccess = tokenAccess;
		this.prenom = prenom;
		this.nom = nom;
		this.roles = roles;
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

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
	
}
