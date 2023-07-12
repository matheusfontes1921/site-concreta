package com.app.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record NoticiaDto(
        @Nullable UUID id,
        @NotBlank(message = "O título não pode estar em branco") String titulo,
        @NotBlank(message = "O conteúdo não pode estar em branco") String conteudo,
        @NotBlank(message = "A URL não pode estar em branco") String url
) {
}

