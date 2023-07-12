package com.app.dto;

import com.app.entity.Imagem;
import com.app.entity.Cliente;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ClienteDTO(@NotBlank UUID id, @NotNull String nome, @NotNull String imagemString) {

    public Imagem toImagem() {
        return new Imagem(imagemString);
    }

    public Cliente toCliente() {
        return new Cliente(nome, toImagem());
    }
}
