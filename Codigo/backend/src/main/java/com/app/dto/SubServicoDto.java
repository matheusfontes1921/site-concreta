package com.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record SubServicoDto(@NotBlank UUID id, @NotNull String nome, @NotNull String imagemString,
                            @NotNull String descricao, @NotBlank UUID servicoId) {
}
