package com.example.Fenalait.dto;

import java.util.List;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class EmployeResponse {
	private Long id;

	@Column(name="firstName")
	@NotBlank(message = "Veuillez entrer le prénom de l'employé !!")
	@Size(min = 2, max = 125,  message = "La taille doit être comprise entre 2-125 ")
	private String firstName;

	@Column(name="lastName")
	@NotBlank(message = "Veuillez entrer le nom de l'employé !!")
	@Size(min = 2, max = 125,  message = "La taille doit être comprise entre 2-125 ")
	private String lastName;

	@Column(name="titre")
	@NotBlank(message = "Veuillez entrer le nom de l'employé !!")
	@Size(min = 2, max = 125,  message = "La taille doit être comprise entre 2-125 ")
	private String titre;

	@Column(name="telEmploye")
	private String telEmploye;


	private List<EmployeDto> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
