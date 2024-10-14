package com.oficina.Estoque.Controller;

import com.oficina.Estoque.Entity.Fornecedor;
import com.oficina.Estoque.Service.FornecedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fornecedor")
public class FornecedorController {

    @Autowired
    private FornecedorService fornecedorService;

    @GetMapping("/listar")
    public ResponseEntity<List<Fornecedor>> listFornecedor() {
        return new ResponseEntity<>(fornecedorService.listarFornecedor(), HttpStatus.OK);
    }

    @PostMapping("/gravar")
    public ResponseEntity<Fornecedor> gravar(@RequestBody Fornecedor fornecedor) {
        fornecedorService.gravar(fornecedor);
        return new ResponseEntity<>(fornecedor, HttpStatus.OK);
    }

    @GetMapping("/buscar")
    public ResponseEntity<Fornecedor> buscar(@RequestParam(value="idFornecedor") Long idFornecedor) {
        return new ResponseEntity<>(fornecedorService.buscarFornecedorPorId(idFornecedor), HttpStatus.OK);
    }

    @DeleteMapping("/apagar")
    public ResponseEntity<Fornecedor> apagar(@RequestParam(value="idFornecedor") Long idFornecedor) {
        Fornecedor fornecedor = fornecedorService.buscarFornecedorPorId(idFornecedor);
        fornecedorService.apagar(idFornecedor);
        return new ResponseEntity<>(fornecedor, HttpStatus.OK);
    }
}
