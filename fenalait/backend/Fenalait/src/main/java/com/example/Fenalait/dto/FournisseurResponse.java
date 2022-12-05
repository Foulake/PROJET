package com.example.Fenalait.dto;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(value = Include.NON_DEFAULT)
public class FournisseurResponse {

	private Long id; 
	private String nom;
	
	private String prenom;
	
	private Date dateFour;
	
	private String tel;
	
	private String categoryFourNom;
	private Long categoryFourId;
	
	private List<FournisseurDto> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;

    private Double qteAppro;
    private LocalDate dateAppro;

	public FournisseurResponse(String nom, String prenom, String tel, Double qteAppro) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.tel = tel;
		this.qteAppro = qteAppro;
	}
	
	public FournisseurResponse(String nom, String prenom, String tel, Double qteAppro, LocalDate dateAppro) {
		super();
		this.nom = nom;
		this.prenom = prenom;
		this.tel = tel;
		this.qteAppro = qteAppro;
		this.dateAppro = dateAppro;
	}
    
    
}
