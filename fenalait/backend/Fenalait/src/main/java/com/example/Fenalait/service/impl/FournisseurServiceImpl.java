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
import org.springframework.stereotype.Service;
import com.example.Fenalait.dto.FournisseurDto;
import com.example.Fenalait.dto.Mapper;
import com.example.Fenalait.dto.FournisseurResponse;
import com.example.Fenalait.exception.ResourceAlredyExistException;
import com.example.Fenalait.exception.ResourceNotFoundExceptions;
import com.example.Fenalait.model.CategorieFournisseur;
import com.example.Fenalait.model.Fournisseur;
import com.example.Fenalait.repository.CategorieFournisseurRepository;
import com.example.Fenalait.repository.FournisseurRepository;
import com.example.Fenalait.service.CategoryFourService;
import com.example.Fenalait.service.FournisseurService;

@Service
public class FournisseurServiceImpl implements FournisseurService{
	
private FournisseurRepository fournisseurRepository;
	
	private CategorieFournisseurRepository categoryFourRepository;
	
	private CategoryFourService categoryFourService;

	public FournisseurServiceImpl(FournisseurRepository fournisseurRepository, CategorieFournisseurRepository categoryFourRepository, CategoryFourService categoryFourService) {
		super();
		this.fournisseurRepository = fournisseurRepository;
		this.categoryFourRepository = categoryFourRepository;
		this.categoryFourService= categoryFourService;
	}

	@Transactional     
	@Override
	public FournisseurResponse addFournisseur(FournisseurDto fournisseurDto) {
		Fournisseur fournisseur = new Fournisseur();
		if(fournisseurRepository.existsFournisseurByTel(fournisseurDto.getTel())) {
			throw new ResourceAlredyExistException(" Il existe bien un fournisseur avec cet numéro : " +fournisseurDto.getTel());
		}else {
			
	        fournisseur.setNom(fournisseurDto.getNom());
	        fournisseur.setPrenom(fournisseurDto.getPrenom());
	        fournisseur.setTel(fournisseurDto.getTel());	
			
		}
		if(fournisseurDto.getCategoryFourId() == null) {
			throw new IllegalArgumentException("Le fournisseur manque de CategorieFournisseur !");
		}
		
		CategorieFournisseur categorieFournisseur = categoryFourService.getCategoryFournisseur(fournisseurDto.getCategoryFourId());
		fournisseur.setCategorieFournisseur(categorieFournisseur);
		
		fournisseur.setNom(fournisseur.getNom());
		fournisseur.setPrenom(fournisseur.getPrenom());
		fournisseur.setDateFour(new Date());
		
		Fournisseur fournisseur1 = fournisseurRepository.save(fournisseur);
		return Mapper.fournisseurToFournisseurResponse(fournisseur1);
	}

	@Override
	public FournisseurResponse getFournisseurById(Long fournisseurId) {
		Fournisseur fournisseur = getFournisseur(fournisseurId);
		return Mapper.fournisseurToFournisseurResponse(fournisseur);
	}

	@Override
	public Fournisseur getFournisseur(Long fournisseurId) {
		Fournisseur fournisseur = fournisseurRepository.findById(fournisseurId)
				.orElseThrow(() -> new ResourceNotFoundExceptions("Il n'existe pas de fournisseur avec id : " + fournisseurId));
		return fournisseur;
	}
	
	
	@Override
	public FournisseurResponse deleteFournisseur(Long fournisseurId) {
		Fournisseur fournisseur = getFournisseur(fournisseurId);
		fournisseurRepository.delete(fournisseur);
		return Mapper.fournisseurToFournisseurResponse(fournisseur);
	}

	@Transactional
	@Override
	public FournisseurResponse editFournisseur(Long fournisseurId, FournisseurDto fournisseurDto) {
		Fournisseur fournisseurEdit = getFournisseur(fournisseurId);
		
		fournisseurEdit.setNom(fournisseurDto.getNom());
		fournisseurEdit.setPrenom(fournisseurDto.getPrenom());
		fournisseurEdit.setTel(fournisseurDto.getTel());
		fournisseurEdit.setDateFour(fournisseurDto.getDateFour());
		
		if(fournisseurDto.getCategoryFourId() != null ) {
			CategorieFournisseur categorieFournisseur = categoryFourService.getCategoryFournisseur(fournisseurDto.getCategoryFourId());
			fournisseurEdit.setCategorieFournisseur(categorieFournisseur);
		}
		
		return Mapper.fournisseurToFournisseurResponse(fournisseurEdit);
	}

	@Override
	public List<FournisseurResponse> getFournisseurs() {
		List<Fournisseur> fournisseurs = StreamSupport
				.stream(fournisseurRepository.findAll().spliterator(), false)
				.collect(Collectors.toList());
		
		return Mapper.fournisseurToFournisseurResponses(fournisseurs);
	}

	

	@Override
	public FournisseurResponse getAllFournisseurs(int pageNo, int pageSize, String sortBy, String sortDir) {
		
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        
        Page<Fournisseur> fournisseurs = fournisseurRepository.findAll(pageable);
        
        List<Fournisseur> listOfFournisseurs = fournisseurs.getContent();
        
        List<FournisseurDto> content = listOfFournisseurs.stream().map(fournisseur -> mapToDTO(fournisseur)).collect(Collectors.toList());
		
        FournisseurResponse fournisseurResponse = new FournisseurResponse();
        fournisseurResponse.setContent(content);
        fournisseurResponse.setPageNo(fournisseurs.getNumber());
        fournisseurResponse.setPageSize(fournisseurs.getSize());
        fournisseurResponse.setTotalElements(fournisseurs.getTotalElements());
        fournisseurResponse.setTotalPages(fournisseurs.getTotalPages());
        fournisseurResponse.setLast(fournisseurs.isLast());

        return fournisseurResponse;
	}


	@Override
	public FournisseurResponse searchFournisseurFull(int pageNo, int pageSize, String sortBy, String sortDir, String keyword) {
		//List<Fournisseur> fournisseurs = this.fournisseurRepository.findByName(keyword);
		
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        
        Page<Fournisseur> fournisseurs = fournisseurRepository.findAll(pageable, keyword);
        
        List<Fournisseur> listOfFournisseurs = fournisseurs.getContent();
        
        List<FournisseurDto> content = listOfFournisseurs.stream().map(fournisseur -> mapToDTO(fournisseur)).collect(Collectors.toList());
		
        FournisseurResponse fournisseurResponse = new FournisseurResponse();
        fournisseurResponse.setContent(content);
        fournisseurResponse.setPageNo(fournisseurs.getNumber());
        fournisseurResponse.setPageSize(fournisseurs.getSize());
        fournisseurResponse.setTotalElements(fournisseurs.getTotalElements());
        fournisseurResponse.setTotalPages(fournisseurs.getTotalPages());
        fournisseurResponse.setLast(fournisseurs.isLast());

        return fournisseurResponse;
	}
	

	 // convert Entity into DTO
   private FournisseurDto mapToDTO(Fournisseur fournisseur){
     //  FournisseurDto fournisseurDto = mapper.map(fournisseur, FournisseurDto.class);
       FournisseurDto fournisseurDto = new FournisseurDto();
       
       fournisseurDto.setId(fournisseur.getId());
       fournisseurDto.setNom(fournisseur.getNom());
       fournisseurDto.setPrenom(fournisseur.getPrenom());
       fournisseurDto.setDateFour(fournisseur.getDateFour());
       fournisseurDto.setTel(fournisseur.getTel());
       fournisseurDto.setCategoryFourId(fournisseur.getCategorieFournisseur().getId());
       fournisseurDto.setCategoryFourNom(fournisseur.getCategorieFournisseur().getDescription());
      
       return fournisseurDto;
   }
   public FournisseurResponse addCategoryFournisseurToFournisseur(Long fournisseurId, Long categoryFourId) {
Fournisseur fournisseur = getFournisseur(fournisseurId);
		CategorieFournisseur categorieFournisseur = categoryFourService.getCategoryFournisseur(categoryFourId);
		if(Objects.nonNull(fournisseur.getCategorieFournisseur())) {
			throw new IllegalArgumentException("Il exist déjà un fournisseur avec cette categorie");
		}
		fournisseur.setCategorieFournisseur(categorieFournisseur);
		fournisseur.addFournisseur(fournisseur);
		return Mapper.fournisseurToFournisseurResponse(fournisseur);
	}


    private Fournisseur mapToEntity(FournisseurDto fournisseurDto){
        //Fournisseur fournisseur = mapper.map(fournisseurDto, Fournisseur.class);
        Fournisseur fournisseur = new Fournisseur();
        fournisseur.setId(fournisseurDto.getId());
        fournisseur.setNom(fournisseurDto.getNom());
        fournisseur.setPrenom(fournisseurDto.getPrenom());
        fournisseur.setTel(fournisseurDto.getTel());
        fournisseur.setDateFour(fournisseurDto.getDateFour());
       // fournisseur.setCategoryFourNom(fournisseur.getCategorieFournisseur().getId());
        return  fournisseur;
    }
	

}
