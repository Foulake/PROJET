package com.example.Fenalait.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.example.Fenalait.dto.ApproDto;
import com.example.Fenalait.dto.ApproResponse;
import com.example.Fenalait.model.Approvissionnement;
import com.example.Fenalait.model.Fournisseur;
import com.example.Fenalait.model.Produit;

@Service
public interface ApproService {
	
	
	
	public ApproResponse addApprovissionnement(ApproDto approDto );
	public ApproResponse getApprovissionnementById(Long approId);
	public Approvissionnement getApprovissionnement(Long approId);
	public List<ApproResponse> getApprovissionnements();
	public ApproResponse getAllApprovissionnements(int pageNo, int pageSize, String sortBy, String sortDir);
	public ApproResponse deleteApprovissionnement(Long approId);
	public ApproResponse editApprovissionnement(Long approId, ApproDto approDto);
	
	public ApproResponse searchApprovissionnementFull(int pageNo, int pageSize, String sortBy, String sortDir, String keyword);

	//public List<Approvissionnement> approvissionnementJourInterval(LocalDate dateStart, LocalDate dateEnd );
	
	public ApproResponse approvissionnementJourInterval(LocalDate dateStart, LocalDate dateEnd, int pageNo, int pageSize, String sortBy, String sortDir);
	
	public ApproResponse findApprovissionnementByFournisseurAndDateApproBetween(
			Fournisseur fournisseur,
			@Param("dateStart")  LocalDate dateStart,  
			@Param("dateEnd")  LocalDate dateEnd);
	
	
	
	public ApproResponse countApprovissionnementJourInterval(Fournisseur fournisseur,
			Produit produit,LocalDate dateStart, LocalDate dateEnd, int pageNo, int pageSize, String sortBy, String sortDir);
	
}
