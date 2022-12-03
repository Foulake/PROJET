package com.example.Fenalait.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Fenalait.dto.PaiementDto;
import com.example.Fenalait.dto.PaiementResponse;

@Service
public interface PaiementService {

	PaiementDto createPaiement(Long fournisseurId, PaiementDto paiementDto);

	 List<PaiementDto> getPaiementsByFournisseurId(Long fournisseurId);

	 PaiementDto getPaiementById(Long fournisseurId, Long paiementId);

	 PaiementDto updatePaiement(Long fournisseurId, Long paiementId, PaiementDto paiementDto);

	 void deletePaiement(Long fournisseurId, Long paiementId);

	PaiementResponse searchPaiementFull(int pageNo, int pageSize, String sortBy, String sortDir, String keywords);
	 
}
