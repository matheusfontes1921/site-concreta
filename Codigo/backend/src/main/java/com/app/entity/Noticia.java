package com.app.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "noticias")
public class Noticia {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false, length = 2000)
    private String conteudo;

    @Column(nullable = false)
    private String url;

    public Noticia() {}

    public Noticia(String titulo, String conteudo, String url) {
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.url = url;
    }
}