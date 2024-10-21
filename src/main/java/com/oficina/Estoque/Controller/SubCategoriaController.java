package com.oficina.Estoque.Controller;

import com.oficina.Estoque.Entity.Categoria;
import com.oficina.Estoque.Entity.SubCategoria;
import com.oficina.Estoque.Service.CategoriaService;
import com.oficina.Estoque.Service.SubCategoriaService;
import com.oficina.Estoque.dto.SubCategoriaDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/sub-categoria")
public class SubCategoriaController {

    @Autowired
    private SubCategoriaService subCategoriaService;

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping("/listar")
    public ResponseEntity<List<SubCategoria>> listCategoria() {
        return new ResponseEntity<>(subCategoriaService.listarSubCategoria(), HttpStatus.OK);
    }

    @PostMapping("/gravar")
    public ResponseEntity<SubCategoria> gravar(@RequestBody SubCategoriaDTO subCategoriaDTO) {
        SubCategoria subCategoria = new SubCategoria();
        subCategoria.setNome(subCategoriaDTO.getNome());
        subCategoria.setCategoria(categoriaService.buscarCategoriaPorId(subCategoriaDTO.getCategoria()));

        subCategoriaService.gravar(subCategoria);
        return new ResponseEntity<>(subCategoria, HttpStatus.OK);
    }

    @GetMapping("/buscar")
    public ResponseEntity<SubCategoria> buscar(@RequestParam(value="idSubCategoria") Long idSubCategoria) {
        return new ResponseEntity<>(subCategoriaService.buscarSubCategoriaPorId(idSubCategoria), HttpStatus.OK);
    }

    @DeleteMapping("/apagar")
    public ResponseEntity<SubCategoria> apagar(@RequestParam(value="idCategoria") Long idSubCategoria) {
        SubCategoria subCategoria = subCategoriaService.buscarSubCategoriaPorId(idSubCategoria);
        subCategoriaService.apagar(idSubCategoria);
        return new ResponseEntity<>(subCategoria, HttpStatus.OK);
    }
}
