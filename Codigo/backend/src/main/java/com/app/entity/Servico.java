package com.app.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@Getter
@Setter
@Entity

@Table(name = "servicos")
public class Servico {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "VARCHAR(36)")
    private UUID id;

    @Column(name = "nome", unique = true)
    private String nome;


    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, targetEntity = Imagem.class)
    private Imagem imagem;

    @Setter(AccessLevel.NONE)
    @OneToMany(mappedBy = "servico")
    private List<SubServico> subservicos = new ArrayList<>();

    public Servico(String nome, Imagem imagem) {
        this.nome = nome;
        this.imagem = imagem;
    }
}
