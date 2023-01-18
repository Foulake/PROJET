package com.example.Fenalait.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.Fenalait.dto.CategoryFourDto;
import com.example.Fenalait.dto.CategoryFourResponse;
import com.example.Fenalait.exception.ResourceNotFoundException;
import com.example.Fenalait.model.CategorieFournisseur;
import com.example.Fenalait.model.Category;
import com.example.Fenalait.model.Localite;
import com.example.Fenalait.repository.CategorieFournisseurRepository;
import com.example.Fenalait.service.CategoryFourService;

@Service
public class CategoryFourServiceImpl implements CategoryFourService{

	private CategorieFournisseurRepository categoryFourRepository; 
	
	public CategoryFourServiceImpl(CategorieFournisseurRepository categoryFourRepository) {
		this.categoryFourRepository = categoryFourRepository;
	}

	@Override
	public CategoryFourDto createCategoryFour(CategoryFourDto categoryDto) {
		 // convert DTO to entity
        CategorieFournisseur category = mapToEntity(categoryDto);
        CategorieFournisseur newCategoryFour = categoryFourRepository.save(category);

        // convert entity to DTO
        CategoryFourDto categoryResponse = mapToDTO(newCategoryFour);
        return categoryResponse;
	}

	@Override
	public CategoryFourResponse getAllCategories(int pageNo, int pageSize, String sortBy, String sortDir) {
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<CategorieFournisseur> categorys = categoryFourRepository.findAll(pageable);

        // get content for page object
        List<CategorieFournisseur> listOfCategoryFours = categorys.getContent();

        List<CategoryFourDto> content= listOfCategoryFours.stream().map(category -> mapToDTO(category)).collect(Collectors.toList());

        CategoryFourResponse categoryResponse = new CategoryFourResponse();
        categoryResponse.setContent(content);
        categoryResponse.setPageNo(categorys.getNumber());
        categoryResponse.setPageSize(categorys.getSize());
        categoryResponse.setTotalElements(categorys.getTotalElements());
        categoryResponse.setTotalPages(categorys.getTotalPages());
        categoryResponse.setLast(categorys.isLast());

        return categoryResponse;
	}

	@Override
	public CategoryFourDto getCategoryFourById(Long id) {
		CategorieFournisseur category = categoryFourRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CategoryFour", "id", id));
        return mapToDTO(category);
	}

	@Override
	public CategoryFourDto updateCategoryFour(CategoryFourDto categoryDto, Long id) {
		// get category by id from the database
        CategorieFournisseur category = categoryFourRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CategoryFour", "id", id));

        category.setDescription(categoryDto.getDescription());

        CategorieFournisseur updatedCategoryFour = categoryFourRepository.save(category);
        return mapToDTO(updatedCategoryFour);
	}

	@Override
	public void deleteCategoryFourById(Long id) {
		// get category by id from the database
        CategorieFournisseur category = categoryFourRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CategoryFour", "id", id));
        categoryFourRepository.delete(category);
	}

	
	 // convert Entity into DTO
    private CategoryFourDto mapToDTO(CategorieFournisseur category){
       // CategoryFourDto categoryDto = mapper.map(category, CategoryFourDto.class);
        CategoryFourDto categoryDto = new CategoryFourDto();
        categoryDto.setId(category.getId());
        categoryDto.setDescription(category.getDescription());
        return categoryDto;
    }

    // convert DTO to entity
    private CategorieFournisseur mapToEntity(CategoryFourDto categoryDto){
        //CategoryFour category = mapper.map(categoryDto, CategoryFour.class);
    	CategorieFournisseur category = new CategorieFournisseur();
        category.setDescription(categoryDto.getDescription());
        return category;
    }

    @Override
	public CategoryFourResponse searchCategoryFourFull(int pageNo, int pageSize, String sortBy, String sortDir,
			String keywords) {
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        
        Page<CategorieFournisseur> categoryFours = categoryFourRepository.findAll(pageable, keywords);
        
        List<CategorieFournisseur> listOfCategoryFours = categoryFours.getContent();
        
        List<CategoryFourDto> content = listOfCategoryFours.stream().map(categoryFour -> mapToDTO(categoryFour)).collect(Collectors.toList());
		
        CategoryFourResponse categoryFourResponse = new CategoryFourResponse();
        categoryFourResponse.setContent(content);
        categoryFourResponse.setPageNo(categoryFours.getNumber());
        categoryFourResponse.setPageSize(categoryFours.getSize());
        categoryFourResponse.setTotalElements(categoryFours.getTotalElements());
        categoryFourResponse.setTotalPages(categoryFours.getTotalPages());
        categoryFourResponse.setLast(categoryFours.isLast());

        return categoryFourResponse;
	}
    
	@Override
    public CategorieFournisseur getCategoryFournisseur(Long categoryId) {
		return categoryFourRepository.findById(categoryId).orElseThrow(
		() ->  new ResourceNotFoundException("Il n'existe pas une category Fournisseur avec id : " + categoryId, null, categoryId));	
	}

	@Override
	public List<CategorieFournisseur> getAll() {
		List<CategorieFournisseur> categorieFournisseurs = categoryFourRepository.findAll();
		return categorieFournisseurs;
	}
}
