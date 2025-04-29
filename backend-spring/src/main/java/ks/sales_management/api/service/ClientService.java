package ks.sales_management.api.service;

import ks.sales_management.api.exception.ClientNotFoundException;
import ks.sales_management.api.exception.OrderNotFoundException;
import ks.sales_management.api.model.Client;
import ks.sales_management.api.repository.ClientRepo;
import ks.sales_management.api.specifications.ClientSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

import static ks.sales_management.api.exception.ClientNotFoundException.createClientNotFoundMessage;
import static ks.sales_management.api.exception.OrderNotFoundException.createOrderNotFoundMessage;

@RequiredArgsConstructor
@Service
public class ClientService {

    private static final int PAGE_SIZE = 25;

    private final ClientRepo clientRepo;


    public Page<Client> getClients(int page) {
        return clientRepo.findAllClients(PageRequest.of(page,PAGE_SIZE));
    }

    public Client saveClient(Client client) {
        return clientRepo.save(client);
    }

    public Client getSingleClient(Long id) {
        return clientRepo.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(createOrderNotFoundMessage(id)));
    }

    public Page<Client> getFilteredClients(int page, String imie, String nazwisko, String email,
                                           String ulica, String nrLokalu, String kodPocztowy,
                                           String miasto, String kodKraju, String telefon) {

        Specification<Client> spec = Specification
                .where(ClientSpecification.hasImie(imie))
                .and(ClientSpecification.hasNazwisko(nazwisko))
                .and(ClientSpecification.hasEmail(email))
                .and(ClientSpecification.hasUlica(ulica))
                .and(ClientSpecification.hasNrLokalu(nrLokalu))
                .and(ClientSpecification.hasKodPocztowy(kodPocztowy))
                .and(ClientSpecification.hasMiasto(miasto))
                .and(ClientSpecification.hasKodKraju(kodKraju))
                .and(ClientSpecification.hasTelefon(telefon));

        return clientRepo.findAll(spec, PageRequest.of(page, PAGE_SIZE));
    }


    public Client updateClient(Client updatedClient, Long id) {
        Client existingClient = clientRepo.findById(id)
                .orElseThrow(() -> new ClientNotFoundException(createClientNotFoundMessage(id)));

        existingClient.setImie(updatedClient.getImie());
        existingClient.setNazwisko(updatedClient.getNazwisko());
        existingClient.setEmail(updatedClient.getEmail());
        existingClient.setUlica(updatedClient.getUlica());
        existingClient.setNrLokalu(updatedClient.getNrLokalu());
        existingClient.setKodPocztowy(updatedClient.getKodPocztowy());
        existingClient.setMiasto(updatedClient.getMiasto());
        existingClient.setKodKraju(updatedClient.getKodKraju());
        existingClient.setTelefon(updatedClient.getTelefon());

        return clientRepo.save(existingClient);
        }

    public void deleteClient(Long id) {
        if (clientRepo.existsById(id)) {
            clientRepo.deleteById(id);
        } else {
            throw new ClientNotFoundException(createClientNotFoundMessage(id));
        }
    }

    public void deleteClients(List<Long> ids) {
        for (Long id : ids)
        {
            deleteClient(id);
        }
    }
}



