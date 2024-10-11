package com.oficina.Estoque.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Entrada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idEntrada", nullable = false)
    private Integer id;

    @Column(name = "Data")
    private LocalDateTime data;

    @Column(name = "Qtde")
    private Double qtde;

    @Column(name = "CustoUnitario", precision = 10, scale = 2)
    private BigDecimal custoUnitario;

    @Column(name = "NotaFiscal", length = 45)
    private String notaFiscal;

    @Column(name = "Obs", length = 150)
    private String obs;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idProduto", nullable = false)
    private Produto idProduto;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idFornecedor", nullable = false)
    private Fornecedor idFornecedor;

}