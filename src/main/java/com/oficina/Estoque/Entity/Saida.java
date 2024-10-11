package com.oficina.Estoque.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Saida {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idSaida", nullable = false)
    private Integer id;

    @Column(name = "Data")
    private LocalDateTime data;

    @Column(name = "Qtde")
    private Double qtde;

    @Column(name = "ValorUnitario", precision = 10, scale = 2)
    private BigDecimal valorUnitario;

    @Column(name = "Destino")
    private Integer destino;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idProduto", nullable = false)
    private Produto idProduto;

}