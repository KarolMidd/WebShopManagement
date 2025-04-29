package ks.sales_management.api.controllery;

import ks.sales_management.api.model.Client;
import ks.sales_management.api.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/customers")
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    public ResponseEntity<Page<Client>> getClients(@RequestParam(required = false) Integer page) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        Page<Client> clients = clientService.getClients(pageNumber);
        return ResponseEntity.ok(clients);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getSingleClient(@PathVariable Long id) {
        Client singleClient = clientService.getSingleClient(id);
        return ResponseEntity.ok(singleClient);
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<Client>> getFilteredClients(
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) String imie,
            @RequestParam(required = false) String nazwisko,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String ulica,
            @RequestParam(required = false) String nrLokalu,
            @RequestParam(required = false) String kodPocztowy,
            @RequestParam(required = false) String miasto,
            @RequestParam(required = false) String kodKraju,
            @RequestParam(required = false) String telefon) {

        int pageNumber = (page != null && page >= 0) ? page : 0;
        Page<Client> clients = clientService.getFilteredClients(pageNumber, imie, nazwisko, email,
                ulica, nrLokalu, kodPocztowy,
                miasto, kodKraju, telefon);
        return ResponseEntity.ok(clients);
    }

    @PostMapping
    public ResponseEntity<Client> addClient(@RequestBody Client client) {
        Client savedClient = clientService.saveClient(client);
        return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@RequestBody Client client, @PathVariable Long id) {
        Client updatedClient = clientService.updateClient(client, id);
        return ResponseEntity.ok(updatedClient);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/batch")
    public ResponseEntity<Void> deleteClients(@RequestBody List<Long> ids) {
        clientService.deleteClients(ids);
        return ResponseEntity.noContent().build();
    }
}
