package com.example.Fenalait.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.Fenalait.model.Produit;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long>{
	
	
	@Query("Select p from Produit p Where p.date like %?1%"
			+"or p.nomPrdt like %?1%"
			+"or p.dateExp like %?1%")
	public Page<Produit> findAll(Pageable pageable, String keywords);

	public List<Produit> findByCategoryId(Long categoryId);

	public List<Produit> findByMagasinId(Long magasinId);

	

	
}
