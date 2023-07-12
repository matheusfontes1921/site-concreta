package com.app.dto;

import com.app.entity.Imagem;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.util.UUID;

public record AvaliacaoDTO(
        @NotBlank UUID id,
        @NotEmpty String nome,
        @NotEmpty String imagemURL,
        @NotEmpty UUID projetoId,
        @NotEmpty String subtitulo,
        @NotEmpty String descricao
) {
    public Imagem toImagem() {
        return new Imagem(imagemURL);
    }

}