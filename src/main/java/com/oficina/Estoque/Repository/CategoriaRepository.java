package com.oficina.Estoque.Repository;

import com.oficina.Estoque.Entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
