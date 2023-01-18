package com.example.Fenalait.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Fenalait.dto.CategoryFourDto;
import com.example.Fenalait.dto.CategoryFourResponse;
import com.example.Fenalait.model.CategorieFournisseur;
import com.example.Fenalait.model.Localite;

@Service
public interface CategoryFourService {

	CategoryFourDto createCategoryFour(CategoryFourDto categoryFourDto);

    CategoryFourResponse getAllCategories(int pageNo, int pageSize, String sortBy, String sortDir);

    CategoryFourDto getCategoryFourById(Long id);

    CategoryFourDto updateCategoryFour(CategoryFourDto categoryFourDto, Long id);

    void deleteCategoryFourById(Long id);

	CategoryFourResponse searchCategoryFourFull(int pageNo, int pageSize, String sortBy, String sortDir, String keywords);

	CategorieFournisseur getCategoryFournisseur(Long categoryId);
	List<CategorieFournisseur> getAll();

}
