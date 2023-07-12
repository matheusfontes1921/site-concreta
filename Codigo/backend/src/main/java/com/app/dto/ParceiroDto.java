package com.app.dto;

import com.app.entity.Imagem;
import com.app.entity.Parceiro;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.UUID;

public record ParceiroDto(@NotBlank UUID id, @NotEmpty String nome, @NotEmpty String imagemString) {

    public Imagem toImagem() {
        return new Imagem(imagemString);
    }

    public Parceiro toParceiro() {
        return new Parceiro(nome, toImagem());
    }
}
