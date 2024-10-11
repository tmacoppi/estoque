package com.oficina.Estoque.Entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class SaidaPedidoId implements Serializable {
    private static final long serialVersionUID = -2599704052466481798L;
    @Column(name = "idSaida", nullable = false)
    private Long idSaida;

    @Column(name = "idPedido", nullable = false)
    private Long idPedido;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SaidaPedidoId entity = (SaidaPedidoId) o;
        return Objects.equals(this.idPedido, entity.idPedido) &&
                Objects.equals(this.idSaida, entity.idSaida);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPedido, idSaida);
    }

}