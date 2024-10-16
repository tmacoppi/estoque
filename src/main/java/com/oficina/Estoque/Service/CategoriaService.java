package com.oficina.Estoque.Service;

import com.oficina.Estoque.Entity.Categoria;
import com.oficina.Estoque.Repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public Categoria buscarCategoriaPorId(Long idCategoria) {
        return categoriaRepository.findById(idCategoria).get();
    }

    public List<Categoria> listarCategoria() {
        return categoriaRepository.findAll();
    }

    public Categoria gravar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public void apagar(Long idCategoria) {
        categoriaRepository.deleteById(idCategoria);
    }
}
