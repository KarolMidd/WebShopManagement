package ks.sales_management.api.specifications;
import ks.sales_management.api.model.Product;
import org.springframework.data.jpa.domain.Specification;

public class ProductSpecification {

    public static Specification<Product> hasNazwa(String nazwa) {
        return (root, query, criteriaBuilder) ->
                nazwa == null ? null : criteriaBuilder.like(root.get("nazwa"), "%" + nazwa + "%");
    }

    public static Specification<Product> hasKategoria(String kategoria) {
        return ((root, query, criteriaBuilder) ->
                kategoria == null ? null : criteriaBuilder.equal(root.get("kategoria"),kategoria));
    }

    public static Specification<Product> hasModel(String model) {
        return ((root, query, criteriaBuilder) ->
                model == null ? null : criteriaBuilder.like(root.get("model"),"%" + model + "%"));
    }

    public static Specification<Product> hasCenaBetween(Double minCena, Double maxCena) {
        return (root, query, criteriaBuilder) -> {
            if (minCena == null && maxCena == null) return null;
            if (minCena == null) return criteriaBuilder.lessThanOrEqualTo(root.get("cena"),maxCena);
            if (maxCena == null) return criteriaBuilder.greaterThanOrEqualTo(root.get("cena"),minCena);
            return criteriaBuilder.between(root.get("cena"),minCena, maxCena);

        };
    }

    public static Specification<Product> hasZamowienie(Long idZamowienia) {
        return ((root, query, criteriaBuilder) ->
                idZamowienia == null ? null : criteriaBuilder.equal(root.get("idZamowienia"),idZamowienia));
    }

    public static Specification<Product> hasDostepnosc(Boolean dostepnosc) {
        return (root, query, criteriaBuilder) -> {
            if (dostepnosc == null) {
                return null;
            }
            if (dostepnosc) {
                return criteriaBuilder.isNull(root.get("idZamowienia"));
            }
            return criteriaBuilder.isNotNull(root.get("idZamowienia"));
        };
    }

}
