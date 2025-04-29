package ks.sales_management.api.specifications;

import ks.sales_management.api.model.Client;
import org.springframework.data.jpa.domain.Specification;

public class ClientSpecification {

    public static Specification<Client> hasImie(String imie) {
        return (root, query, criteriaBuilder) ->
                imie == null ? null : criteriaBuilder.like(root.get("imie"), "%" + imie + "%");
    }

    public static Specification<Client> hasNazwisko(String nazwisko) {
        return (root, query, criteriaBuilder) ->
                nazwisko == null ? null : criteriaBuilder.like(root.get("nazwisko"), "%" + nazwisko + "%");
    }

    public static Specification<Client> hasEmail(String email) {
        return (root, query, criteriaBuilder) ->
                email == null ? null : criteriaBuilder.equal(root.get("email"), email);
    }

    public static Specification<Client> hasUlica(String ulica) {
        return (root, query, criteriaBuilder) ->
                ulica == null ? null : criteriaBuilder.like(root.get("ulica"), "%" + ulica + "%");
    }

    public static Specification<Client> hasNrLokalu(String nrLokalu) {
        return (root, query, criteriaBuilder) ->
                nrLokalu == null ? null : criteriaBuilder.equal(root.get("nrLokalu"), nrLokalu);
    }

    public static Specification<Client> hasKodPocztowy(String kodPocztowy) {
        return (root, query, criteriaBuilder) ->
                kodPocztowy == null ? null : criteriaBuilder.equal(root.get("kodPocztowy"), kodPocztowy);
    }

    public static Specification<Client> hasMiasto(String miasto) {
        return (root, query, criteriaBuilder) ->
                miasto == null ? null : criteriaBuilder.like(root.get("miasto"), "%" + miasto + "%");
    }

    public static Specification<Client> hasKodKraju(String kodKraju) {
        return (root, query, criteriaBuilder) ->
                kodKraju == null ? null : criteriaBuilder.equal(root.get("kodKraju"), kodKraju);
    }

    public static Specification<Client> hasTelefon(String telefon) {
        return (root, query, criteriaBuilder) ->
                telefon == null ? null : criteriaBuilder.equal(root.get("telefon"), telefon);
    }
}
