package com.oficina.Estoque.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "Saida_Producao")
public class SaidaProducao {
    @EmbeddedId
    private SaidaProducaoId id;

    @MapsId("idSaida")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idSaida", nullable = false)
    private Saida saida;

    @MapsId("idProducao")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idProducao", nullable = false)
    private Producao producao;

}