package com.example.Fenalait.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Fenalait.dto.ProduitResponse;
import com.example.Fenalait.dto.VenteDto;
import com.example.Fenalait.dto.VenteResponse;
import com.example.Fenalait.model.Vente;

@Service
public interface VenteService {

	public VenteResponse addVente(VenteDto venteDto );
	public VenteResponse getVenteById(Long venteId);
	public Vente getVente(Long venteId);
	public List<VenteResponse> getVentes();
	public VenteResponse getAllVentes(int pageNo, int pageSize, String sortBy, String sortDir);
	public VenteResponse deleteVente(Long venteId);
	//
	public VenteResponse addClientToVente(Long venteId, Long clientId);
	public VenteResponse addProduitToVente(Long venteId, Long produitId);
	
	public VenteResponse removeClientFromVente(Long venteId, Long clientId);
	public VenteResponse removeProduitFromVente(Long venteId, Long produitId);
	public VenteResponse addUserTovente(Long venteId, Long userId);
	public VenteResponse removeUserFromVente(Long venteId, Long userId);
	//
	public VenteResponse editVente(Long venteId, VenteDto venteDto);
	public VenteResponse searchVenteFull(int pageNo, int pageSize, String sortBy, String sortDir, String keyword);
	 
}
