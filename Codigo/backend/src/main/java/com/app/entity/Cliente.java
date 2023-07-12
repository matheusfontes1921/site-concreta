package com.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@Table(name = "cliente")
@Entity
@Data
@NoArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nome;
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, targetEntity = Imagem.class)
    private Imagem imagem;

    public Cliente(String nome, Imagem imagem) {
        this.nome = nome;
        this.imagem = imagem;
    }
}
