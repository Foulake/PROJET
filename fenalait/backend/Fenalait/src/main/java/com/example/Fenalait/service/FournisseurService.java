package com.example.Fenalait.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Fenalait.dto.FournisseurDto;
import com.example.Fenalait.dto.FournisseurResponse;
import com.example.Fenalait.dto.ProduitResponse;
import com.example.Fenalait.model.Fournisseur;

@Service
public interface FournisseurService {
	
	public FournisseurResponse addFournisseur(FournisseurDto fournisseurDto );
	public FournisseurResponse getFournisseurById(Long fournisseurId);
	public Fournisseur getFournisseur(Long fournisseurId);
	public List<FournisseurResponse> getFournisseurs();
	public FournisseurResponse getAllFournisseurs(int pageNo, int pageSize, String sortBy, String sortDir);
	public FournisseurResponse deleteFournisseur(Long fournisseurId);
	public FournisseurResponse editFournisseur(Long fournisseurId, FournisseurDto fournisseurDto);
	public FournisseurResponse addCategoryFournisseurToFournisseur(Long fournisseurId, Long categoryFourId);
	
	public FournisseurResponse searchFournisseurFull(int pageNo, int pageSize, String sortBy, String sortDir, String keyword);


}
