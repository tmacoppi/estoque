package com.oficina.Estoque.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter
@Setter
@Entity
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idPedido", nullable = false)
    private Long id;

    @Column(name = "ValorTotal", precision = 10, scale = 2)
    private BigDecimal valorTotal;

    @Column(name = "ValorFinal", precision = 10, scale = 2)
    private BigDecimal valorFinal;

    @Column(name = "Desconto")
    private Double desconto;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idCliente", nullable = false)
    private Cliente cliente;

}