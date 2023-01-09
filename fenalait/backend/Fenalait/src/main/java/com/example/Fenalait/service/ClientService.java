
package com.example.Fenalait.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Fenalait.dto.ClientDto;
import com.example.Fenalait.dto.ClientResponse;
import com.example.Fenalait.model.Client;

@Service
public interface ClientService {

	ClientDto createClient(ClientDto clientDto);

    ClientResponse getAllClients(int pageNo, int pageSize, String sortBy, String sortDir);
    List<Client> getAll();

    public Client getClient(Long clientId);
    
    ClientDto getClientById(Long id);

    ClientDto updateClient(ClientDto clientDto, Long id);

    void deleteClientById(Long id);

	ClientResponse searchClientFull(int pageNo, int pageSize, String sortBy, String sortDir, String keywords);

}
