package com.example.Fenalait.dto;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.example.Fenalait.model.Vente;
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

public class ClientDto {

	private Long id;
	
	@NotBlank(message = "Veuillez entrer le nom du client !!")
	@Size(min = 2, max = 125,  message = "La taille doit être comprise entre 2-125 ")
	private String nomClient;
	
	@NotBlank(message = "Veuillez entrer le prénom du client !!")
	@Size(min = 2, max = 125,  message = "La taille doit être comprise entre 2-125 ")
	private String prenomClient;
	
	@NotBlank(message = "Le numéro ne peut pas être nul !")
	@Pattern(regexp = "^(\\+\\d{1,3}( )?)?(\\d{2}[ ]?)(\\d{2}[ ]?){2}\\d{2}$" , message = "Voici le format : +223 65 20 14 12")	
	private String telClient;
	
	private List<Vente> ventes;
}
