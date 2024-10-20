package com.oficina.Estoque.Service;

import com.oficina.Estoque.Entity.SubCategoria;
import com.oficina.Estoque.Repository.SubCategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class SubCategoriaService {

    @Autowired
    private SubCategoriaRepository subCategoriaRepository;

    public SubCategoria buscarSubCategoriaPorId(Long idSubCategoria) {
        return subCategoriaRepository.findById(idSubCategoria).get();
    }

    public List<SubCategoria> listarSubCategoria() {
        return subCategoriaRepository.findAll();
    }

    public List<SubCategoria> listarSubCategoriaPorCategoria(Long idCategoria) {
        return null;
    }

    public SubCategoria gravar(SubCategoria subCategoria) {
        return subCategoriaRepository.save(subCategoria);
    }

    public void apagar(Long idSubCategoria) {
        subCategoriaRepository.deleteById(idSubCategoria);
    }
}
