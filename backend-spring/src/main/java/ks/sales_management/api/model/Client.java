package ks.sales_management.api.model;

import lombok.Data;

import jakarta.persistence.*;


@Entity
@Data
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imie;
    private String nazwisko;
    private String email;
    private String ulica;
    @Column(name = "nr_lokalu")
    private String nrLokalu;
    @Column(name = "kod_pocztowy")
    private String kodPocztowy;
    private String miasto;
    @Column(name = "kod_kraju")
    private String kodKraju;
    private String telefon;
}
