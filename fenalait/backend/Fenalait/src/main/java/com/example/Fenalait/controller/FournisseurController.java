package com.example.Fenalait.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
public class FournisseurController {

	private FournisseurService fournisseurService;

    public FournisseurController(FournisseurService fournisseurService) {
        this.fournisseurService = fournisseurService;
    }

    @PostMapping("/add")
	//@RolesAllowed({"ROLE_ADMIN"})
	public ResponseEntity<FournisseurResponse> addProduct(@Valid @RequestBody FournisseurDto productDto){
		FournisseurResponse productResponseDto = fournisseurService.addFournisseur(productDto);
		return new ResponseEntity<FournisseurResponse>(productResponseDto, HttpStatus.OK);
	}
   
    @GetMapping("/get/{id}")
	public ResponseEntity<FournisseurResponse> getProduct(@PathVariable final Long productId){
    	FournisseurResponse productDto = fournisseurService.getFournisseurById(productId);
		return new ResponseEntity<FournisseurResponse>(productDto, HttpStatus.OK);
	}
    
    @GetMapping("/getAll")
    public FournisseurResponse getAllProducts(
            @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ){
        return fournisseurService.getAllFournisseurs(pageNo, pageSize, sortBy, sortDir);
    }
    

    @PutMapping("/edit/{id}")
	public ResponseEntity<FournisseurResponse> editProduct(@Valid @RequestBody final FournisseurDto productRequestDto, @PathVariable final Long id){
    	FournisseurResponse productResponseDto = fournisseurService.editFournisseur(id, productRequestDto);
		return new ResponseEntity<>(productResponseDto, HttpStatus.OK);
	}
    
    @DeleteMapping("/delete/{id}")
	//@RolesAllowed({"ROLE_ADMIN"})
	public ResponseEntity<Map<String, Boolean>> deletePrroduct(@PathVariable final Long id){
		fournisseurService.deleteFournisseur(id);
		Map<String, Boolean> response =new  HashMap<>();
    	response.put("Le fournisseur a été supprimé avec succès", Boolean.TRUE);
    	return ResponseEntity.ok(response);
	
	}


    @GetMapping("/search/full/{keywords}")
	public  ResponseEntity<FournisseurResponse> searchProductByFull(
			 @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
	            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
	            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
	            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir,
			@PathVariable("keywords") String keywords){
		FournisseurResponse result= fournisseurService.searchFournisseurFull(pageNo, pageSize, sortBy, sortDir, keywords);
				
		return new ResponseEntity<FournisseurResponse>(result, HttpStatus.OK);
 }
}
