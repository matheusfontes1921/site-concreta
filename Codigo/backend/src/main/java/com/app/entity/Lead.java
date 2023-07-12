package com.app.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "leads")
@NoArgsConstructor
@Getter
@AllArgsConstructor
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nome;

    private String email;

    private String descoberta;

    private String descricao;

    private String telefone;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, targetEntity = Servico.class)
    private Servico servico;

    public Lead(String nome, String email, String descoberta, String descricao,
                String telefone, Servico servico) {
        this.nome = nome;
        this.email = email;
        this.descoberta = descoberta;
        this.servico = servico;
    }


}
