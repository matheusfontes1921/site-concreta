package com.app.dto;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record LeadDto(

        @NotNull String nome,
        @NotNull String email,
        @NotNull String descricao,
        @NotNull String telefone,
        @NotNull String descoberta,
        @NotNull UUID id_servico

) {
}
