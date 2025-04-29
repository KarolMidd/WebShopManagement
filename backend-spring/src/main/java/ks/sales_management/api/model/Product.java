package ks.sales_management.api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_zamowienia")
    private Long idZamowienia;
    private String nazwa;
    private String kategoria;
    private String model;
    private Double cena;

}
