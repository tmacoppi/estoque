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
public class SaidaProducaoId implements Serializable {
    private static final long serialVersionUID = 4968611131650855401L;
    @Column(name = "idSaida", nullable = false)
    private Long idSaida;

    @Column(name = "idProducao", nullable = false)
    private Long idProducao;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        SaidaProducaoId entity = (SaidaProducaoId) o;
        return Objects.equals(this.idProducao, entity.idProducao) &&
                Objects.equals(this.idSaida, entity.idSaida);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idProducao, idSaida);
    }

}