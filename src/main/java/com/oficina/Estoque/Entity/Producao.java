package com.oficina.Estoque.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Producao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProducao", nullable = false)
    private Long id;

    @Column(name = "DataInicio")
    private LocalDateTime dataInicio;

    @Column(name = "DataFim")
    private LocalDateTime dataFim;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idProduto", nullable = false)
    private Produto idProduto;

    @Column(name = "Medidas", length = 45)
    private String medidas;

    @Column(name = "Qtde")
    private Long qtde;

    @Column(name = "Status")
    private Long status;

}