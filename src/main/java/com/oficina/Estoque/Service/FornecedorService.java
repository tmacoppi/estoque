package com.oficina.Estoque.Service;

import com.oficina.Estoque.Entity.Fornecedor;
import com.oficina.Estoque.Repository.FornecedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class FornecedorService {

    @Autowired
    private FornecedorRepository fornecedorRepository;

    public Fornecedor buscarFornecedorPorId(Long idFornecedor) {
        return fornecedorRepository.findById(idFornecedor).get();
    }

    public List<Fornecedor> listarFornecedor() {
        return fornecedorRepository.findAll();
    }

    public Fornecedor gravar(Fornecedor fornecedor) {
        return fornecedorRepository.save(fornecedor);
    }

    public void apagar(Long idFornecedor) {
        fornecedorRepository.deleteById(idFornecedor);
    }
}
