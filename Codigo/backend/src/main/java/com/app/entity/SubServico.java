package com.app.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;
import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sub_servico")
public class SubServico {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;
    @Column(name = "nome", unique = true)
    private String nome;
    @Column(name = "descricao")
    private String descricao;
    @JoinColumn(name = "imagem_id")
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Imagem imagem;
    @ManyToOne
    @JsonIgnore
    private Servico servico;

    public SubServico(String nome, String descricao, Imagem imagem, Servico servico) {
        this.nome = nome;
        this.descricao = descricao;
        this.servico = servico;
        this.imagem = imagem;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SubServico that = (SubServico) o;
        return Objects.equals(id, that.id) && Objects.equals(nome, that.nome) && Objects.equals(descricao, that.descricao) && Objects.equals(servico, that.servico);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, nome, descricao, servico);
    }


}
