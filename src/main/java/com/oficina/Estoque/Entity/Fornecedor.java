package com.oficina.Estoque.Entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Fornecedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idFornecedor", nullable = false)
    private Integer id;

    @Column(name = "Nome", length = 45)
    private String nome;

    @Column(name = "CNPJ_CPF", length = 14)
    private String cnpjCpf;

    @Column(name = "Endereco", length = 100)
    private String endereco;

    @Column(name = "Email", length = 100)
    private String email;

    @Column(name = "Contato", length = 45)
    private String contato;

    @Column(name = "Telefone", length = 20)
    private String telefone;

}