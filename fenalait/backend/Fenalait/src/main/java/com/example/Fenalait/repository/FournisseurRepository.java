package com.example.Fenalait.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.Fenalait.dto.FournisseurResponse;
import com.example.Fenalait.model.Approvissionnement;
import com.example.Fenalait.model.Fournisseur;
import com.example.Fenalait.model.Produit;

@Repository
public interface FournisseurRepository extends JpaRepository<Fournisseur, Long>{
	Optional<Fournisseur> findById(Long id);
	


	@Query("SELECT f FROM Fournisseur f WHERE "
			+ "CONCAT( f.id, '', f.nom, '',  f.prenom, '', f.dateFour, '', f.tel )"
			+ " LIKE %?1%")
	Page<Fournisseur> findAll(Pageable pageable, String keyword);

	/** New code **/
	@Query("SELECT new com.example.Fenalait.dto.FournisseurResponse(c.nom , c.prenom, c.tel, p.qteAppro) FROM Fournisseur c JOIN c.approvissionnements p")
	public List<FournisseurResponse> getFournisseursByAppro();

	
	List<Fournisseur> findByCategorieFournisseurId(Long categoryFourId);

	boolean existsFournisseurByTel(String tel);
	
	List<Fournisseur> findFournisseurByApprovissionnements(
			Approvissionnement approvissionnement);
	
	

	/**
	 It's WORKS successfully
	 **/
	@Query("SELECT new com.example.Fenalait.dto.FournisseurResponse(f.nom , f.prenom, f.tel, sum(appro.qteAppro) as quantités, appro.dateAppro ) FROM Fournisseur f " +
			"LEFT JOIN f.approvissionnements appro " +
			"GROUP BY f.nom ORDER BY quantités")
	List<FournisseurResponse> getAllFournisseurWithQteCountAppro();
	
	
	@Query("SELECT new com.example.Fenalait.dto.FournisseurResponse(f.nom , f.prenom, f.tel, sum(appro.qteAppro) as quantités, appro.dateAppro ) FROM Fournisseur f " +
			"LEFT JOIN f.approvissionnements appro WHERE appro.dateAppro BETWEEN :dateStart AND :dateEnd")
	List<FournisseurResponse> getAllFournisseurWithQteCountApproAndDate(
			@Param("dateStart")  LocalDate dateStart,  
			@Param("dateEnd")  LocalDate dateEnd);
	
}
