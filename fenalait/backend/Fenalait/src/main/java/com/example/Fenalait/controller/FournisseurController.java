package com.example.Fenalait.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Fenalait.dto.FournisseurDto;
import com.example.Fenalait.dto.FournisseurResponse;
import com.example.Fenalait.service.FournisseurService;
import com.example.Fenalait.utils.AppConstants;

@RestController
@RequestMapping("/api/v1/fournisseurs")
@CrossOrigin(origins = "http://localhost:4200")

public class FournisseurController {

	private FournisseurService fournisseurService;

    public FournisseurController(FournisseurService fournisseurService) {
        this.fournisseurService = fournisseurService;
    }

    @PostMapping("/add")
	//@RolesAllowed({"ROLE_ADMIN"})
	public ResponseEntity<FournisseurResponse> addFournisseur(@Valid @RequestBody FournisseurDto fournisseurDto){
		FournisseurResponse fournisseurResponseDto = fournisseurService.addFournisseur(fournisseurDto);
		return new ResponseEntity<FournisseurResponse>(fournisseurResponseDto, HttpStatus.OK);
	}
   
    @GetMapping("/get/{fournisseurId}")
	public ResponseEntity<FournisseurResponse> getFournisseur(@PathVariable final Long fournisseurId){
    	FournisseurResponse fournisseurDto = fournisseurService.getFournisseurById(fournisseurId);
		return new ResponseEntity<FournisseurResponse>(fournisseurDto, HttpStatus.OK);
	}
    
    @GetMapping("/getAll")
    public FournisseurResponse getAllFournisseurs(
            @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ){
        return fournisseurService.getAllFournisseurs(pageNo, pageSize, sortBy, sortDir);
    }
    

    @PutMapping("/edit/{id}")
	public ResponseEntity<FournisseurResponse> editFournisseur(@Valid @RequestBody final FournisseurDto fournisseurRequestDto, @PathVariable final Long id){
    	FournisseurResponse fournisseurResponseDto = fournisseurService.editFournisseur(id, fournisseurRequestDto);
		return new ResponseEntity<>(fournisseurResponseDto, HttpStatus.OK);
	}
    
    @DeleteMapping("/delete/{id}")
	//@RolesAllowed({"ROLE_ADMIN"})
	public ResponseEntity<Map<String, Boolean>> deleteFournisseur(@PathVariable final Long id){
		fournisseurService.deleteFournisseur(id);
		Map<String, Boolean> response =new  HashMap<>();
    	response.put("Le fournisseur a été supprimé avec succès", Boolean.TRUE);
    	return ResponseEntity.ok(response);
	
	}


    @GetMapping("/search/full/{keywords}")
	public  ResponseEntity<FournisseurResponse> searchFournisseurByFull(
			 @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
	            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
	            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
	            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir,
			@PathVariable("keywords") String keywords){
		FournisseurResponse result= fournisseurService.searchFournisseurFull(pageNo, pageSize, sortBy, sortDir, keywords);
				
		return new ResponseEntity<FournisseurResponse>(result, HttpStatus.OK);
 }
}
