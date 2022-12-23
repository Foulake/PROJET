package com.example.Fenalait.repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.Fenalait.model.Approvissionnement;
import com.example.Fenalait.model.Fournisseur;
import com.example.Fenalait.model.Produit;


@Repository
public interface ApproRepository extends JpaRepository<Approvissionnement, Long> {
	Optional<Approvissionnement> findById(Long id);

	@Query( "SELECT appro FROM Approvissionnement appro WHERE "
			+ "CONCAT(appro.id, '', appro.qteAppro, '', appro.dateAppro)"
			+ " LIKE %?1%")
	public Page<Approvissionnement> findAllAppro(String keyword, Pageable pageable);
	
	
	@Query(value =  "SELECT appro FROM Approvissionnement appro WHERE "
			+ "CONCAT(appro.id, '', appro.qteAppro, '', appro.dateAppro)"
			+ " LIKE %?1%")
	Page<Approvissionnement> findAll(Pageable pageable, String keyword);
	

	List<Approvissionnement> findByFournisseurId(Long fournisseurId);

	List<Approvissionnement> findByProduitId(Long produitId);
	
	/**
	  @It's works successfully
	 **/
	@Query( "SELECT appros FROM Approvissionnement appros WHERE appros.dateAppro BETWEEN :dateStart AND :dateEnd  ")
	public Page<Approvissionnement> approvissionnementJourInterval(
									@Param("dateStart")  LocalDate dateStart,  
									@Param("dateEnd")  LocalDate dateEnd ,
									Pageable pageable);
	
	
	
	List<Approvissionnement> findApprovissionnementByFournisseurAndDateApproBetween(
			Fournisseur fournisseur,
			@Param("dateStart")  LocalDate dateStart,  
			@Param("dateEnd")  LocalDate dateEnd);
			
	
	
	
	Page<Approvissionnement> countQteApproApprovissionnementsByFournisseurAndProduitAndDateApproBetween(
			Fournisseur fournisseur,
			Produit produit,
			@Param("dateStart")  LocalDate dateStart,  
			@Param("dateEnd")  LocalDate dateEnd,
			Pageable pageable);
	
	//Page<Approvissionnement> findByDateApproBetween(Pageable pageable, String keyword, Date startDateAppro, Date endDateAppro);

	List<Approvissionnement> findApprovissionnementsByFournisseurIdAndProduitId(
			Long fournisseurId,
			Long produitId);
	
	List<Approvissionnement> findApprovissionnementsByFournisseurIdAndProduitIdAndDateApproBetween(Long fournisseurId,
			Long produitId,
			@Param("dateStart")  LocalDate dateStart,  
			@Param("dateEnd")  LocalDate dateEnd);
	
}
