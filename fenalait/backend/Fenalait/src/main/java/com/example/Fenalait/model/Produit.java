package com.example.Fenalait.model;


import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper=false)
@Entity
@ToString
@Table(name="Produits")
public class Produit extends  BaseEntity{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="nomPrdt")
	private String nomPrdt;
	
	@Column(name="qte")
	private Double qte;
	
	 private String code;
	  
	 private float price;
	  
	@Column(name="date")
	@Temporal(TemporalType.DATE)
	private Date date;
	
	@Column(name="dateExp")
	private java.sql.Date dateExp;
	
	@ManyToOne
	@JsonBackReference
	private Category category;

	@ManyToOne
	@JsonBackReference
	private Magasin magasin;
	
	@ManyToOne
	@JsonBackReference
	private User user;
	
	//	@JsonInclude(JsonInclude.Include.NON_NULL)
//	@Transient
	@OneToMany(mappedBy ="produit")
	private List<Vente> ventes;
	
	@OneToMany(mappedBy ="produit")
	@JsonManagedReference
	private List<Approvissionnement> approvissionnements;

	public Produit() {
		super();
		
	}
	
	public Produit(Long id, String nomPrdt, Double qte, Date date,
			java.sql.Date dateExp) {
		super();
		this.id = id;
		this.nomPrdt = nomPrdt;
		this.qte = qte;
		this.date = date;
		this.dateExp = dateExp;
	}

	public void addApprovissionnement(Approvissionnement approvissionnement) {
		approvissionnements.add(approvissionnement);
	}
	
	public void removeApprovissionnement(Approvissionnement approvissionnement) {
		approvissionnements.remove(approvissionnement);
	}
}
