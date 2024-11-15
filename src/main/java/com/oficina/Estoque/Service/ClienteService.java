package com.oficina.Estoque.Service;

import com.oficina.Estoque.Entity.Cliente;
import com.oficina.Estoque.Repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente buscarClientePorId(Long idCliente) {
        return clienteRepository.findById(idCliente).get();
    }

    public List<Cliente> listarCliente() {
        return clienteRepository.findAll();
    }

    public Cliente gravar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public void apagar(Long idCliente) {
        clienteRepository.deleteById(idCliente);
    }
}
