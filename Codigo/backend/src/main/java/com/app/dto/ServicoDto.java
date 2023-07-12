package com.app.dto;

import com.app.entity.Imagem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ServicoDto (@NotBlank UUID id, @NotNull String nome, @NotNull String imagemString){
    public Imagem toImagem() {
        return new Imagem(imagemString);
    }
}
