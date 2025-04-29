package ks.sales_management.api.specifications;

import ks.sales_management.api.model.Order;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class OrderSpecification {

    public static Specification<Order> hasIdKlienta(Long idKlienta) {
        return (root, query, criteriaBuilder) ->
                idKlienta == null ? null : criteriaBuilder.equal(root.get("idKlienta"), idKlienta);
    }

    public static Specification<Order> hasStatus(String status) {
        return (root, query, criteriaBuilder) ->
                status == null ? null : criteriaBuilder.equal(root.get("status"), status);
    }

    public static Specification<Order> hasDataZlozeniaBetween(LocalDateTime startDate, LocalDateTime endDate) {
        return (root, query, criteriaBuilder) -> {
            if (startDate == null && endDate == null) return null;
            if (startDate == null) return criteriaBuilder.lessThanOrEqualTo(root.get("dataZlozenia"), endDate);
            if (endDate == null) return criteriaBuilder.greaterThanOrEqualTo(root.get("dataZlozenia"), startDate);
            return criteriaBuilder.between(root.get("dataZlozenia"), startDate, endDate);
        };
    }

    public static Specification<Order> hasKwotaCalkowitaBetween(Double minKwota, Double maxKwota) {
        return (root, query, criteriaBuilder) -> {
            if (minKwota == null && maxKwota == null) return null;
            if (minKwota == null) return criteriaBuilder.lessThanOrEqualTo(root.get("kwotaCalkowita"), maxKwota);
            if (maxKwota == null) return criteriaBuilder.greaterThanOrEqualTo(root.get("kwotaCalkowita"), minKwota);
            return criteriaBuilder.between(root.get("kwotaCalkowita"), minKwota, maxKwota);
        };
    }

    public static Specification<Order> hasDostawa(String dostawa) {
        return (root, query, criteriaBuilder) ->
                dostawa == null ? null : criteriaBuilder.equal(root.get("dostawa"), dostawa);
    }

    public static Specification<Order> hasPlatnosc(String platnosc) {
        return (root, query, criteriaBuilder) ->
                platnosc == null ? null : criteriaBuilder.equal(root.get("platnosc"), platnosc);
    }

    public static Specification<Order> isOplacone(Boolean oplacone) {
        return (root, query, criteriaBuilder) ->
                oplacone == null ? null : criteriaBuilder.equal(root.get("oplacone"), oplacone);
    }
}
