package com.oficina.Estoque.Repository;

import com.oficina.Estoque.Entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
