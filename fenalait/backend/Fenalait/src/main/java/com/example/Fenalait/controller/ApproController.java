package com.example.Fenalait.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
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

import com.example.Fenalait.dto.ApproDto;
import com.example.Fenalait.dto.ApproResponse;
import com.example.Fenalait.dto.FournisseurResponse;
import com.example.Fenalait.model.Approvissionnement;
import com.example.Fenalait.model.Fournisseur;
import com.example.Fenalait.repository.FournisseurRepository;
import com.example.Fenalait.service.ApproService;
import com.example.Fenalait.utils.AppConstants;


@RestController
@RequestMapping("/api/v1/approvissionnements")
@CrossOrigin(origins = "http://localhost:4200")
public class ApproController {
	
	private ApproService approService;
	private FournisseurRepository fournisseurRepository;
    public ApproController(ApproService approService, FournisseurRepository fournisseurRepository) {
        this.approService = approService;
        this.fournisseurRepository = fournisseurRepository;
    }

    @PostMapping("/add")
	//@RolesAllowed({"ROLE_ADMIN"})
	public ResponseEntity<ApproResponse> addProduct(@Valid @RequestBody ApproDto approDto){
		ApproResponse approResponse = approService.addApprovissionnement(approDto);
		return new ResponseEntity<ApproResponse>(approResponse, HttpStatus.OK);
	}
   
    @GetMapping("/get/{id}")
	public ResponseEntity<ApproResponse> getProduct(@PathVariable final Long approId){
    	ApproResponse approDto = approService.getApprovissionnementById(approId);
		return new ResponseEntity<ApproResponse>(approDto, HttpStatus.OK);
	}
    
    @GetMapping("/getAll")
    public ApproResponse getAllProducts(
            @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir
    ){
        return approService.getAllApprovissionnements(pageNo, pageSize, sortBy, sortDir);
    }
    
    @GetMapping("/intervaldate/{fournisseurId}/{produitId}/={dateStart}/{dateEnd}")
  	public ApproResponse ApproJourIntervals(@RequestBody Approvissionnement approvissionnement,
  			@PathVariable Long fournisseurId,@PathVariable Long produitId,
  			@PathVariable
  			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateStart, 
  			@PathVariable
  			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateEnd ){
    	
      	ApproResponse  approvissionnements = approService.findApprovissionnementByJourInterval(fournisseurId, produitId, dateStart, dateEnd);
      			return approvissionnements;
  	}

    @PutMapping("/edit/{id}")
	public ResponseEntity<ApproResponse> editProduct(@Valid @RequestBody final ApproDto approDto, @PathVariable final Long id){
    	ApproResponse approResponse = approService.editApprovissionnement(id, approDto);
		return new ResponseEntity<>(approResponse, HttpStatus.OK);
	}
    
    @DeleteMapping("/delete/{id}")
	//@RolesAllowed({"ROLE_ADMIN"})
	public ResponseEntity<Map<String, Boolean>> deletePrroduct(@PathVariable final Long id){
		approService.deleteApprovissionnement(id);
		Map<String, Boolean> response =new  HashMap<>();
    	response.put("Le approvissionnement a été supprimé avec succès", Boolean.TRUE);
    	return ResponseEntity.ok(response);
	
	}

    @GetMapping("/search/full/{keywords}")
	public  ResponseEntity<ApproResponse> searchProductByFull(
			 @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
	            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
	            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
	            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir,
			@PathVariable("keywords") String keywords){
		ApproResponse result= approService.searchApprovissionnementFull(pageNo, pageSize, sortBy, sortDir, keywords);
				
		return new ResponseEntity<ApproResponse>(result, HttpStatus.OK);
 }
    
    @GetMapping("/approinterval={dateStart}/{dateEnd}")
	public ApproResponse getApproJourIntervals(
			 @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
	            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
	            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
	            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir,
		
			@PathVariable
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateStart, 
			@PathVariable
			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateEnd ){
    	ApproResponse  approvissionnements = approService.approvissionnementJourInterval(dateStart, dateEnd, pageNo, pageSize, sortBy, sortDir);
		return approvissionnements;
	}

    @GetMapping("/countapprointerval/{fournisseur}={dateStart}/{dateEnd}")
  	public ApproResponse counttApproJourIntervals(
  			@PathVariable Fournisseur fournisseur,
  			@PathVariable
  			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateStart, 
  			@PathVariable
  			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateEnd ){
      	ApproResponse  approvissionnements = approService.findApprovissionnementByFournisseurAndDateApproBetween(fournisseur, dateStart, dateEnd);
      			return approvissionnements;
  	}
    
    
    @GetMapping("/getAllFournisseurByQteAppro")
	public ResponseEntity<List<FournisseurResponse>> getApprosByFfournisseur(){
		List<FournisseurResponse> fournisseurResponseDtos = fournisseurRepository.getAllFournisseurWithQteCountAppro();
		return new ResponseEntity<>(fournisseurResponseDtos, HttpStatus.OK);
	}
    
    @GetMapping("/getFournisseurByQteAppro/date={dateStart}/{dateEnd}")
	public ResponseEntity<List<FournisseurResponse>> getApprosByFfournisseurAndDate(
			@PathVariable
  			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateStart, 
  			@PathVariable
  			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateEnd){
		List<FournisseurResponse> fournisseurResponseDtos = fournisseurRepository.getAllFournisseurWithQteCountApproAndDate(dateStart, dateEnd);
		return new ResponseEntity<>(fournisseurResponseDtos, HttpStatus.OK);
	}
    
    /**
    @GetMapping("/countapprointerval/fournisseur/produit={dateStart}/{dateEnd}")
  	public ApproResponse counttApproJourIntervals(
  			 @RequestParam(value = "pageNo", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
  	            @RequestParam(value = "pageSize", defaultValue = AppConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
  	            @RequestParam(value = "sortBy", defaultValue = AppConstants.DEFAULT_SORT_BY, required = false) String sortBy,
  	            @RequestParam(value = "sortDir", defaultValue = AppConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir,
  		
  	          @RequestBody Fournisseur fournisseur,
  	        @RequestBody Produit produit,
  			@PathVariable
  			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateStart, 
  			@PathVariable
  			@DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateEnd ){
      	ApproResponse  approvissionnements = approService.countApprovissionnementJourInterval(fournisseur, produit, dateStart, dateEnd, pageNo, pageSize, sortBy, sortDir);
  		return approvissionnements;
  	}
		**/
    
   
}
