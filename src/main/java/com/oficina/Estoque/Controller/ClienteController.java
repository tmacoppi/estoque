package com.oficina.Estoque.Controller;

import com.oficina.Estoque.Entity.Cliente;
import com.oficina.Estoque.Service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/listar")
    public ResponseEntity<List<Cliente>> listCliente() {
        return new ResponseEntity<>(clienteService.listarCliente(), HttpStatus.OK);
    }

    @PostMapping("/gravar")
    public ResponseEntity<Cliente> gravar(@RequestBody Cliente cliente) {
        try {
            clienteService.gravar(cliente);
        } catch (Exception e) {
            return new ResponseEntity<>(cliente, HttpStatus.OK);
        }
        return new ResponseEntity<>(cliente, HttpStatus.OK);
    }

    @GetMapping("/buscar")
    public ResponseEntity<Cliente> buscar(@RequestParam(value="idCliente") Long idCliente) {
        return new ResponseEntity<>(clienteService.buscarClientePorId(idCliente), HttpStatus.OK);
    }

    @DeleteMapping("/apagar")
    public ResponseEntity<Cliente> apagar(@RequestParam(value="idCliente") Long idCliente) {
        Cliente cliente = clienteService.buscarClientePorId(idCliente);
        clienteService.apagar(idCliente);
        return new ResponseEntity<>(cliente, HttpStatus.OK);
    }
}
