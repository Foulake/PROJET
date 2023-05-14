package com.example.Fenalait.service.impl;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.Fenalait.dto.Mapper;
import com.example.Fenalait.dto.VenteDto;
import com.example.Fenalait.dto.VenteResponse;
import com.example.Fenalait.exception.ResourceNotFoundExceptions;
import com.example.Fenalait.model.Client;
import com.example.Fenalait.model.Produit;
import com.example.Fenalait.model.User;
import com.example.Fenalait.model.Vente;
import com.example.Fenalait.repository.ClientRepository;
import com.example.Fenalait.repository.UserRepository;
import com.example.Fenalait.repository.VenteRepository;
import com.example.Fenalait.service.ClientService;
import com.example.Fenalait.service.ProduitService;
import com.example.Fenalait.service.UserService;
import com.example.Fenalait.service.VenteService;

@Service
public class VenteServiceImpl implements VenteService{

private VenteRepository venteRepository;
	
	private ClientRepository clientRepository;
	
	private  UserRepository userRepository;
	
	private ClientService clientService;
	
	private  ProduitService produitService;
	private  UserService userService;

	public VenteServiceImpl(VenteRepository venteRepository, ClientRepository clientRepository, UserRepository userRepository,ProduitService produitService,ClientService clientService,UserService userService) {
		super();
		this.venteRepository = venteRepository;
		this.clientRepository = clientRepository;
		this.userRepository = userRepository;
		this.clientService = clientService;
		this.produitService = produitService;	
		this.userService = userService;		
		}

	@Transactional     
	@Override
	public VenteResponse addVente(VenteDto venteDto) {
		Vente vente = new Vente();
		double qteVendue = 0.0;
		double qterestante = 0.0;
		vente.setMontant(venteDto.getMontant());
		vente.setQuantite(venteDto.getQuantite());
		vente.setDate(new Date());
		vente.setRemise(venteDto.isRemise());
		
		if(venteDto.getClientId() == null ) {
			throw new IllegalArgumentException("Le vente manque de Client !");
		}
		if(venteDto.getProduitId() == null) {
			throw new IllegalArgumentException("Le vente manque de Produit !");
		}
		
//		if(venteDto.isRemise()) {
//			qterestante = (venteDto.getQuantite()*qteVendue)/100;
//		}
		
		Client client = clientService.getClient(venteDto.getClientId());
		vente.setClient(client);
		
		Produit produit = produitService.getProduit(venteDto.getProduitId());
		//On recupère la qte restantes du produit après une vente
		qteVendue =venteDto.getQuantite();
		qterestante = produit.getQte() - qteVendue;
		//On modifie la qte restantes du produit après une vente
		produit.setQte(qterestante);
		vente.setProduit(produit);
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		
		User user = userRepository.findByEmail(auth.getName()).get();
		vente.setUser(user);
		
		
		vente.setMontant(qteVendue * produit.getPrice());
		vente.setQuantite(vente.getQuantite());
		//vente.setMontant(venteDto.getQuantite()*vente.getProduit().getPrice());
		vente.setRemise(vente.isRemise());
		vente.setDate(new Date());
		//vente.setUser(user);
		
		Vente vente1 = venteRepository.save(vente);
		return Mapper.venteToVenteResponse(vente1);
	}

	@Override
	public VenteResponse getVenteById(Long venteId) {
		Vente vente = getVente(venteId);
		return Mapper.venteToVenteResponse(vente);
	}

	@Override
	public Vente getVente(Long venteId) {
		Vente vente = venteRepository.findById(venteId)
				.orElseThrow(() -> new ResourceNotFoundExceptions("Il n'existe pas de vente avec id : " + venteId));
		return vente;
	}
	
	
	@Override
	public VenteResponse deleteVente(Long venteId) {
		double qteRestante = 0.0;
		
		Vente vente = getVente(venteId);
		Produit prod = produitService.getProduit(vente.getProduit().getId());
		
		if(prod != null) {
			qteRestante = prod.getQte() + vente.getQuantite();
			prod.setQte(qteRestante);
		}
		
		venteRepository.delete(vente);
		return Mapper.venteToVenteResponse(vente);
	}

	@Transactional
	@Override
	public VenteResponse editVente(Long venteId, VenteDto venteDto) {
		Vente venteEdit = getVente(venteId);
		
		double qteEdit =0;
		double qteRest =0;
		
		
		venteEdit.setMontant(venteDto.getQuantite()*venteEdit.getProduit().getPrice());
		venteEdit.setDate(new Date());
		venteEdit.setRemise(venteDto.isRemise());
		
		if(venteDto.getClientId() != null ) {
			Client client = clientService.getClient(venteDto.getClientId());
			venteEdit.setClient(client);
			
		}
		if(venteDto.getProduitId() != null ) {
			Produit produit = produitService.getProduit(venteDto.getProduitId());
			
			qteRest = produit.getQte() + venteEdit.getQuantite();
			qteEdit = qteRest - venteDto.getQuantite();
			produit.setQte(qteEdit);
			
			
			venteEdit.setProduit(produit);
		}
		venteEdit.setQuantite(venteDto.getQuantite());
		
		if(venteDto.getUserId() != null ) {
			User user = userService.getUser(venteDto.getUserId());
			venteEdit.setUser(user);
		}
		
		return Mapper.venteToVenteResponse(venteEdit);
	}


	@Override
	public List<VenteResponse> getVentes() {
		List<Vente> ventes = StreamSupport
				.stream(venteRepository.findAll().spliterator(), false)
				.collect(Collectors.toList());
		
		return Mapper.venteToVenteResponses(ventes);
	}

	

	@Override
	public VenteResponse getAllVentes(int pageNo, int pageSize, String sortBy, String sortDir) {
		
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        
        Page<Vente> ventes = venteRepository.findAll(pageable);
        
        List<Vente> listOfVentes = ventes.getContent();
        
        List<VenteDto> content = listOfVentes.stream().map(vente -> mapToDTO(vente)).collect(Collectors.toList());
		
        VenteResponse venteResponse = new VenteResponse();
        venteResponse.setContent(content);
        venteResponse.setPageNo(ventes.getNumber());
        venteResponse.setPageSize(ventes.getSize());
        venteResponse.setTotalElements(ventes.getTotalElements());
        venteResponse.setTotalPages(ventes.getTotalPages());
        venteResponse.setLast(ventes.isLast());

        return venteResponse;
	}

	

	@Override
	public VenteResponse searchVenteFull(int pageNo, int pageSize, String sortBy, String sortDir, String keyword) {
		//List<Vente> ventes = this.venteRepository.findByName(keyword);
		
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        
        Page<Vente> ventes = venteRepository.findAll(pageable, keyword);
        
        List<Vente> listOfVentes = ventes.getContent();
        
        List<VenteDto> content = listOfVentes.stream().map(vente -> mapToDTO(vente)).collect(Collectors.toList());
		
        VenteResponse venteResponse = new VenteResponse();
        venteResponse.setContent(content);
        venteResponse.setPageNo(ventes.getNumber());
        venteResponse.setPageSize(ventes.getSize());
        venteResponse.setTotalElements(ventes.getTotalElements());
        venteResponse.setTotalPages(ventes.getTotalPages());
        venteResponse.setLast(ventes.isLast());

        return venteResponse;
	}
	
	private VenteDto mapToDTO(Vente vente){
     //   VenteDto venteDto = mapper.map(vente, VenteDto.class);

        VenteDto venteDto = new VenteDto();
        venteDto.setId(vente.getId());
        venteDto.setDate(vente.getDate());
        venteDto.setMontant(vente.getMontant());
        venteDto.setRemise(vente.isRemise());
        venteDto.setQuantite(vente.getQuantite());
        venteDto.setClientId(vente.getClient().getId());
        venteDto.setClientNom(vente.getClient().getNomClient());
        venteDto.setClientNom(vente.getClient().getTelClient());
        venteDto.setClientNom(vente.getClient().getPrenomClient());
        venteDto.setProduitId(vente.getProduit().getId());
        venteDto.setProduitNom(vente.getProduit().getNomPrdt());
        venteDto.setUserId(vente.getUser().getId());
        venteDto.setUsernom(vente.getUser().getEmail());
        
        return  venteDto;
    }

    private Vente mapToEntity(VenteDto venteDto){
        //Vente vente = mapper.map(venteDto, Vente.class);
        Vente vente = new Vente();
        vente.setId(venteDto.getId());
        vente.setDate(venteDto.getDate());
        vente.setQuantite(venteDto.getQuantite());
        vente.setRemise(venteDto.isRemise());
        
        return  vente;
    }

	@Override
	public VenteResponse addClientToVente(Long venteId, Long clientId) {
		Vente vente = getVente(venteId);
		Client client = clientService.getClient(clientId);		
		if(Objects.nonNull(vente.getClient())) {
			throw new IllegalArgumentException("Il exist déjà un vente avec cet client");
		}
		vente.setClient(client);
		client.addVente(vente);
		return Mapper.venteToVenteResponse(vente);
	}


	@Override
	public VenteResponse addProduitToVente(Long venteId, Long produitId) {
		Vente vente = getVente(venteId);
		Produit produit = produitService.getProduit(produitId);		
		if(Objects.nonNull(vente.getProduit())) {
			throw new IllegalArgumentException("Il exist déjà un vente avec cet produit");
		}
		vente.setProduit(produit);
		produit.addVente(vente);
		return Mapper.venteToVenteResponse(vente);
	}

	@Override
	public VenteResponse removeClientFromVente(Long venteId, Long clientId) {
		Vente vente = getVente(venteId);
		Client client = clientService.getClient(clientId);
		if(!(Objects.nonNull(vente.getClient()))) {
			throw new IllegalArgumentException("Il exist pas un produit avec cet client ID " +clientService.getClient(clientId));
		}
		vente.setClient(null);
		client.removeVente(vente);
		return Mapper.venteToVenteResponse(vente);
	
	}

	@Override
	public VenteResponse removeProduitFromVente(Long venteId, Long produitId) {
		Vente vente = getVente(venteId);
		Produit produit = produitService.getProduit(produitId);
		if(!(Objects.nonNull(vente.getProduit()))) {
			throw new IllegalArgumentException("Il exist pas un produit avec cet produit ID " +produitService.getProduit(produitId));
		}
		vente.setProduit(null);
		produit.removeVente(vente);
		return Mapper.venteToVenteResponse(vente);
	
	}

	@Override
	public VenteResponse addUserTovente(Long venteId, Long userId) {
		Vente vente = getVente(venteId);
		User user = userService.getUser(userId);		
		if(Objects.nonNull(vente.getUser())) {
			throw new IllegalArgumentException("Il exist déjà un vente avec cet client");
		}
		vente.setUser(user);
		user.addVente(vente);
		return Mapper.venteToVenteResponse(vente);
	}

	@Override
	public VenteResponse removeUserFromVente(Long venteId, Long userId) {
		Vente vente = getVente(venteId);
		User user = userService.getUser(userId);
		if(!(Objects.nonNull(vente.getUser()))) {
			throw new IllegalArgumentException("Il exist pas un produit avec cet user ID " +userService.getUser(userId));
		}
		vente.setUser(null);
		user.removeVente(vente);
		return Mapper.venteToVenteResponse(vente);
	
	}
    
}
