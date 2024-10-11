package com.oficina.Estoque.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "Saida_Pedido")
public class SaidaPedido {
    @EmbeddedId
    private SaidaPedidoId id;

    @MapsId("idSaida")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idSaida", nullable = false)
    private Saida idSaida;

    @MapsId("idPedido")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idPedido", nullable = false)
    private Pedido idPedido;

}