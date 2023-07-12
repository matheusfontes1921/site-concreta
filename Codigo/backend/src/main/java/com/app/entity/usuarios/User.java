package com.app.entity.usuarios;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name="users")
public class User {
    @Id
    @Column(unique = true, nullable = false)
    private String nome;
    @Column
    private String senha;
    @Column
    private  Cargo cargo;


    public User(String nome, String senha, Cargo cargo) {
        this.nome = nome;
        this.senha = senha;
        this.cargo = cargo;
    }

}
