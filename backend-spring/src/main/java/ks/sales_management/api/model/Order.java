package ks.sales_management.api.model;

import lombok.Data;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "id_klienta")
    private Long idKlienta;
    private String status;
    @Column(name = "data_zlozenia")
    private LocalDateTime dataZlozenia;
    private Double kwotaCalkowita;
    private String dostawa;
    private String platnosc;
    private Boolean oplacone;
}
