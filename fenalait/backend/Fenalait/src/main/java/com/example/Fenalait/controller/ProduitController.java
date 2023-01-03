package com.example.Fenalait.controller;

import java.util.HashMap;
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

import com.example.Fenalait.dto.ProduitResponse;
import com.example.Fenalait.dto.ProduitDto;
import com.example.Fenalait.service.ProduitService;
import com.example.Fenalait.utils.AppConstants;

@RestController
@RequestMapping("/api/v1/produits")
@CrossOrigin(origins = "http://localhost:4200")

public class ProduitController {
	
	 private ProduitService produitService;

	    public ProduitController(ProduitService produitService) {
	        this.produitService = produitService;
	    }

	    @PostMapping("/add")
		//@RolesAllowed({"ROLE_ADMIN"})
		public ResponseEntity<ProduitResponse> addProduct(@Valid @RequestBody ProduitDto productDto){
			ProduitResponse productResponseDto = produitService.addProduit(productDto);
			return new ResponseEntity<ProduitResponse>(productResponseDto, HttpStatus.OK);
		}
	   
	    @GetMapping("/get/{id}")
		public ResponseEntity<ProduitResponse> getProduct(@PathVariable final Long productId){
	    	ProduitResponse productDto = produitService.getProduitById(productId);
			return new ResponseEntity<ProduitResponse>(productDto, HttpStatus.OK);
		}
	    
	    @GetMapping("/getAll")
	    public ProduitResponse getAllProducts(
	            @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
	            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
	            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
	            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
	    ){
	        return produitService.getAllProduits(pageNo, pageSize, sortBy, sortDir);
	    }
	    

	    @PutMapping("/edit/{id}")
		public ResponseEntity<ProduitResponse> editProduct(@Valid @RequestBody final ProduitDto productRequestDto, @PathVariable final Long id){
	    	ProduitResponse productResponseDto = produitService.editProduit(id, productRequestDto);
			return new ResponseEntity<>(productResponseDto, HttpStatus.OK);
		}
	    
	    @DeleteMapping("/delete/{id}")
		//@RolesAllowed({"ROLE_ADMIN"})
		public ResponseEntity<Map<String, Boolean>> deletePrroduct(@PathVariable final Long id){
			produitService.deleteProduit(id);
			Map<String, Boolean> response =new  HashMap<>();
	    	response.put("Le produit a été supprimé avec succès", Boolean.TRUE);
	    	return ResponseEntity.ok(response);
		
		}


	    @GetMapping("/search/full/{keywords}")
		public  ResponseEntity<ProduitResponse> searchProductByFull(
				 @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
		            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
		            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
		            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir,
				@PathVariable("keywords") String keywords){
			ProduitResponse result= produitService.searchProduitFull(pageNo, pageSize, sortBy, sortDir, keywords);
					
			return new ResponseEntity<ProduitResponse>(result, HttpStatus.OK);
	 }
}
