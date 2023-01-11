package com.example.Fenalait.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Fenalait.dto.LocaliteRequestDto;
import com.example.Fenalait.dto.LocaliteResponse;
import com.example.Fenalait.model.Localite;

@Service
public interface LocaliteService {

	LocaliteRequestDto createLocalite(LocaliteRequestDto localiteDto);

    LocaliteResponse getAllLocalites(int pageNo, int pageSize, String sortBy, String sortDir);

    LocaliteRequestDto getLocaliteById(Long id);

    LocaliteRequestDto updateLocalite(LocaliteRequestDto localiteDto, Long id);

    void deleteLocaliteById(Long id);

	List<Localite> getAll();

}
