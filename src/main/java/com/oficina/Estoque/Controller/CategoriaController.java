package com.oficina.Estoque.Controller;

import com.oficina.Estoque.Entity.Categoria;
import com.oficina.Estoque.Service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/")
    public ResponseEntity<List<Categoria>> listCategoria() {
        return new ResponseEntity<>(categoriaService.listarCategoria(), HttpStatus.OK);
    }

    @PostMapping("/gravar")
    public ResponseEntity<Categoria> gravar(@RequestBody Categoria categoria) {
        categoriaService.gravar(categoria);
        return new ResponseEntity<>(categoria, HttpStatus.OK);
    }

    @DeleteMapping("/apagar")
    public ResponseEntity<String> apagar(@RequestParam(value="idCategoria") Long idCategoria) {
        categoriaService.apagar(idCategoria);
        return new ResponseEntity<>("Categoria apagada com sucesso!", HttpStatus.OK);
    }
}
