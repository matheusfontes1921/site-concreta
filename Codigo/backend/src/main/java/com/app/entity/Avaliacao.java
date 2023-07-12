package com.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "avaliacao")
public class Avaliacao {

    @Id
    @Column(name = "id", updatable = false, unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column
    private String nome;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, targetEntity = Imagem.class)
    private Imagem imagem;
    @OneToOne(fetch = FetchType.EAGER, targetEntity = Projeto.class)
    private Projeto projeto;
    @Column
    private String subtitulo;
    @Column
    private String descricao;

    public Avaliacao(String nome, Imagem imagem, String subtitulo, String descricao, Projeto projeto) {
        this.nome = nome;
        this.imagem = imagem;
        this.subtitulo = subtitulo;
        this.descricao = descricao;
        this.projeto= projeto;
    }


}