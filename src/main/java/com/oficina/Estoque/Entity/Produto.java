package com.oficina.Estoque.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idProduto", nullable = false)
    private Integer id;

    @Column(name = "Nome", length = 45)
    private String nome;

    @Column(name = "Descricao", length = 150)
    private String descricao;

    @Column(name = "UnidadeMedida", length = 10)
    private String unidadeMedida;

    @Column(name = "Peso")
    private Double peso;

    @Column(name = "EstoqueMinimo")
    private Double estoqueMinimo;

    @Column(name = "EstoqueMaximo")
    private Double estoqueMaximo;

    @Column(name = "DataCadastro")
    private LocalDateTime dataCadastro;

    @Column(name = "Status")
    private Integer status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idCategoria", nullable = false)
    private Categoria idCategoria;

}